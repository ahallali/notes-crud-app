'use client';

import { signIn, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Page = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession(); 

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  
  useEffect(() => {
    if (session) {
      const userId = session.user.id; 
    }
  }, [session]);

  return (
    <div className="flex justify-center items-center w-full bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-200 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Login
        </button>
        
        <p className="mt-4 text-sm text-center">
          Don't have an account? 
          <a href="/register" className="text-blue-600 hover:underline"> Register</a>
        </p>
      </form>
    </div>
  );
};

export default Page;
