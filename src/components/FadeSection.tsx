'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
