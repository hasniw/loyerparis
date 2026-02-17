'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-accent-500">Loyer</span><span className="text-white">Paris</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <Link href="/" className="hover:text-accent-400 transition-colors">Accueil</Link>
          <Link href="/blog/prix-loyer-paris-2026" className="hover:text-accent-400 transition-colors">Blog</Link>
          <Link href="#estimez" className="px-4 py-1.5 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors">Estimer</Link>
        </div>
      </nav>
    </header>
  );
}
