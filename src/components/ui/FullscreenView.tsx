import { ReactNode } from 'react';

interface FullscreenViewProps {
  children: ReactNode;
}

export default function FullscreenView({ children }: FullscreenViewProps) {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/80 z-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        {children}
      </div>
    </div>
  );
}