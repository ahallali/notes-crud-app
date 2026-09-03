import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { noteInput, requireUser } from '../../../lib/note-access';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['PUT', 'DELETE'].includes(req.method ?? '')) { res.setHeader('Allow', ['PUT', 'DELETE']); return res.status(405).json({ message: 'Method not allowed.' }); }
  try {
    const userId = await requireUser(req, res);
    if (!userId) return;
    const id = typeof req.query.id === 'string' && /^\d+$/.test(req.query.id) ? Number(req.query.id) : NaN;
    if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({ message: 'Invalid note ID.' });
    if (req.method === 'DELETE') {
      const result = await prisma.note.deleteMany({ where: { id, userId } });
      return result.count ? res.status(204).end() : res.status(404).json({ message: 'Note not found.' });
    }
    const input = noteInput.safeParse(req.body);
    if (!input.success) return res.status(400).json({ message: 'A valid title and content are required.' });
    const result = await prisma.note.updateMany({ where: { id, userId }, data: input.data });
    return result.count ? res.status(200).json({ message: 'Note saved.' }) : res.status(404).json({ message: 'Note not found.' });
  } catch { return res.status(500).json({ message: 'Could not update the note. Please try again.' }); }
}
