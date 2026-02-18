'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-navy-900/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-accent-500">Loyer</span><span className="text-white">Paris</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Accueil' },
            { href: '/blog/prix-loyer-paris-2026', label: 'Blog' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-gray-400 hover:text-white transition px-4 py-2 rounded-lg hover:bg-white/[0.05] text-sm font-medium">
              {link.label}
            </Link>
          ))}
          <Link href="#estimez" className="ml-3 px-5 py-2.5 bg-accent-500 text-white rounded-xl text-sm font-semibold hover:bg-accent-600 transition-all hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5">
            Estimer
          </Link>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden mx-4 mb-4 glass-card p-4 space-y-1">
          <Link href="/" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition" onClick={() => setMobileOpen(false)}>Accueil</Link>
          <Link href="/blog/prix-loyer-paris-2026" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="#estimez" className="block px-4 py-3 mt-2 text-center bg-accent-500 text-white rounded-xl font-semibold" onClick={() => setMobileOpen(false)}>Estimer</Link>
        </div>
      )}
    </header>
  );
}
