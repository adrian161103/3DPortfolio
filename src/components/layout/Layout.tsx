import React from 'react';
import HamburgerMinimal from '../ui/HamburgerMinimal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black relative">
      {/* Header hamburguesa global */}
      <HamburgerMinimal />
      
      {/* Contenido de cada página */}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;