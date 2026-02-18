import React from 'react';

export default function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
