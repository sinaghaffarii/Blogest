'use client';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import React, { createContext, use, useState } from 'react';

interface AuthenticateContextType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthenticateContext = createContext<AuthenticateContextType | undefined>(
  undefined,
);
AuthenticateContext.displayName = 'AuthenticateContext';

export const AuthenticateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    // eslint-disable-next-line @eslint-react/no-unstable-context-value
    <AuthenticateContext value={{ open, setOpen }}>
      {children}
    </AuthenticateContext>
  );
};

export const useAuthenticateContext = (): AuthenticateContextType => {
  const context = use(AuthenticateContext);
  if (!context) {
    throw new Error('useOpenContext must be used within an OpenProvider');
  }
  return context;
};
