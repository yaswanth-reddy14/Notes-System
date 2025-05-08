import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {children}
    </div>
  );
};