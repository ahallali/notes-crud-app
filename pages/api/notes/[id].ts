import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      const { title, content, userId } = req.body; 
      const updatedNote = await prisma.note.update({
        where: { id: Number(id) },
        data: { title, content },
      });
      res.status(200).json(updatedNote);
      break;

    case 'DELETE':
      await prisma.note.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
