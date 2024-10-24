import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { userId } = req.query; 
      const notes = await prisma.note.findMany({
        where: { userId: Number(userId) },
      });
      res.status(200).json(notes);
      break;

    case 'POST':
      const { title, content, userId: createUserId } = req.body; 
      const newNote = await prisma.note.create({
        data: {
          title,
          content,
          userId: Number(createUserId),
        },
      });
      res.status(201).json(newNote);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
