import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { noteInput, requireUser } from '../../../lib/note-access';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['GET', 'POST'].includes(req.method ?? '')) { res.setHeader('Allow', ['GET', 'POST']); return res.status(405).json({ message: 'Method not allowed.' }); }
  try {
    const userId = await requireUser(req, res);
    if (!userId) return;
    if (req.method === 'GET') return res.status(200).json(await prisma.note.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } }));
    const input = noteInput.safeParse(req.body);
    if (!input.success) return res.status(400).json({ message: 'A title (1–200 characters) and content (1–20,000 characters) are required.' });
    return res.status(201).json(await prisma.note.create({ data: { ...input.data, userId } }));
  } catch { return res.status(500).json({ message: 'Could not load or save notes. Please try again.' }); }
}
