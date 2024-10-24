'use client';

import { SessionProvider } from 'next-auth/react';

interface SessionWrapperProps {
  children: JSX.Element;
}

const SessionWrapper : React.FC<React.PropsWithChildren<{}>>  = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
