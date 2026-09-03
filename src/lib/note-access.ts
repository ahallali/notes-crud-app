import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';
import { z } from 'zod';
export const noteInput = z.object({ title: z.string().trim().min(1).max(200), content: z.string().trim().min(1).max(20000) });
export async function requireUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const id = Number(session?.user?.id);
  if (!Number.isSafeInteger(id) || id <= 0) { res.status(401).json({ message: 'Sign in to access notes.' }); return null; }
  if (req.method !== 'GET') {
    // JSON-only mutations plus strict Origin checks prevent browser form CSRF.
    const origin = req.headers.origin;
    const expected = process.env.NEXTAUTH_URL;
    if (!req.headers['content-type']?.startsWith('application/json') || !origin || !expected || origin !== new URL(expected).origin) {
      res.status(403).json({ message: 'Request origin is not allowed.' }); return null;
    }
  }
  res.setHeader('Cache-Control', 'private, no-store');
  return id;
}
