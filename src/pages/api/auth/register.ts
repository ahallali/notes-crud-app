import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';


const registration = z.object({ username: z.string().trim().min(1).max(80), email: z.string().trim().email().max(254).transform(v => v.toLowerCase()), password: z.string().min(12).max(72) });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const input = registration.safeParse(req.body);
    if (!input.success) return res.status(400).json({ message: 'Provide a name, valid email and a password of 12–72 characters.' });
    const { username, email, password } = input.data;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User registered successfully', user: { id: user.id, username: user.username, email: user.email } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
