import collection from '../src/pages/api/notes';
import item from '../src/pages/api/notes/[id]';
import { getServerSession } from 'next-auth/next';
import prisma from '../src/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
jest.mock('next-auth/next', () => ({ getServerSession: jest.fn() }));
jest.mock('../src/lib/auth', () => ({ authOptions: {} }));
jest.mock('../src/lib/prisma', () => ({ __esModule: true, default: { note: { findMany: jest.fn(), create: jest.fn(), updateMany: jest.fn(), deleteMany: jest.fn() } } }));
const session = jest.mocked(getServerSession);
function request(method: string, body: unknown = {}, id = '7', origin = 'http://localhost:3000') {
  return { method, body, query: { id, userId: '999' }, headers: { origin, 'content-type': 'application/json' } } as unknown as NextApiRequest;
}
function response() {
  const res = { status: jest.fn(), json: jest.fn(), end: jest.fn(), setHeader: jest.fn() };
  res.status.mockReturnValue(res); res.json.mockReturnValue(res); res.end.mockReturnValue(res);
  return res as unknown as NextApiResponse;
}
beforeEach(() => { jest.clearAllMocks(); process.env.NEXTAUTH_URL = 'http://localhost:3000'; session.mockResolvedValue({ user: { id: '3' } } as never); });
it('rejects unauthenticated reads before touching the database', async () => {
  session.mockResolvedValue(null); const res = response(); await collection(request('GET'), res);
  expect(res.status).toHaveBeenCalledWith(401); expect(prisma.note.findMany).not.toHaveBeenCalled();
});
it('ignores a forged query user ID', async () => {
  jest.mocked(prisma.note.findMany).mockResolvedValue([]); await collection(request('GET'), response());
  expect(prisma.note.findMany).toHaveBeenCalledWith({ where: { userId: 3 }, orderBy: { updatedAt: 'desc' } });
});
it('creates notes for the session user, ignoring forged body ownership', async () => {
  await collection(request('POST', { title: 'Title', content: 'Content', userId: 999 }), response());
  expect(prisma.note.create).toHaveBeenCalledWith({ data: { title: 'Title', content: 'Content', userId: 3 } });
});
it('rejects cross-origin writes', async () => {
  const res = response(); await collection(request('POST', { title: 'Title', content: 'Content' }, '7', 'https://other.example'), res);
  expect(res.status).toHaveBeenCalledWith(403); expect(prisma.note.create).not.toHaveBeenCalled();
});
it('rejects invalid note content', async () => {
  const res = response(); await collection(request('POST', { title: ' ', content: 'Content' }), res);
  expect(res.status).toHaveBeenCalledWith(400); expect(prisma.note.create).not.toHaveBeenCalled();
});
it.each(['PUT', 'DELETE'])('requires authentication for %s', async method => {
  session.mockResolvedValue(null); const res = response(); await item(request(method), res);
  expect(res.status).toHaveBeenCalledWith(401); expect(prisma.note.updateMany).not.toHaveBeenCalled(); expect(prisma.note.deleteMany).not.toHaveBeenCalled();
});
it('updates with ownership enforced in the database operation', async () => {
  jest.mocked(prisma.note.updateMany).mockResolvedValue({ count: 0 }); const res = response();
  await item(request('PUT', { title: 'Title', content: 'Content', userId: 999 }), res);
  expect(prisma.note.updateMany).toHaveBeenCalledWith({ where: { id: 7, userId: 3 }, data: { title: 'Title', content: 'Content' } });
  expect(res.status).toHaveBeenCalledWith(404);
});
it('deletes with ownership enforced in the database operation', async () => {
  jest.mocked(prisma.note.deleteMany).mockResolvedValue({ count: 0 }); const res = response(); await item(request('DELETE'), res);
  expect(prisma.note.deleteMany).toHaveBeenCalledWith({ where: { id: 7, userId: 3 } }); expect(res.status).toHaveBeenCalledWith(404);
});
it('rejects invalid note IDs without deleting', async () => {
  const res = response(); await item(request('DELETE', {}, '7abc'), res);
  expect(res.status).toHaveBeenCalledWith(400); expect(prisma.note.deleteMany).not.toHaveBeenCalled();
});
it('does not expose database error details', async () => {
  jest.mocked(prisma.note.findMany).mockRejectedValue(new Error('sensitive database detail')); const res = response(); await collection(request('GET'), res);
  expect(res.status).toHaveBeenCalledWith(500); expect(res.json).toHaveBeenCalledWith({ message: 'Could not load or save notes. Please try again.' });
});
