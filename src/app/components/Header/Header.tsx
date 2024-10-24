'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    const res = await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-semibold">Notes</span>
        </div>
        <div className="space-x-4">
          {session ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-400"
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="hover:text-gray-400">Login</a>
              <a href="/register" className="hover:text-gray-400">Register</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
