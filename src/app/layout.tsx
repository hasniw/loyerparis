import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: { default: 'LoyerParis - Prix des loyers à Paris et Île-de-France 2026', template: '%s | LoyerParis' },
  description: 'Consultez les prix des loyers à Paris et en Île-de-France en 2026. Arrondissement par arrondissement, estimez votre loyer et trouvez le meilleur quartier.',
  metadataBase: new URL('https://loyerparis.vercel.app'),
  openGraph: { type: 'website', locale: 'fr_FR', siteName: 'LoyerParis', images: [{ url: '/og.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <Analytics />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="bg-navy-800/50 border-t border-white/5 py-12">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-3"><span className="text-accent-500">Loyer</span>Paris</h3>
              <p className="text-gray-500">Prix des loyers à Paris et Île-de-France. Données mises à jour en 2026.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Navigation</h3>
              <ul className="space-y-1 text-gray-500">
                <li><Link href="/" className="hover:text-accent-400 transition-colors">Accueil</Link></li>
                <li><Link href="/blog/prix-loyer-paris-2026" className="hover:text-accent-400 transition-colors">Blog</Link></li>
                <li><Link href="/paris-1er" className="hover:text-accent-400 transition-colors">Paris 1er</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Ressources</h3>
              <ul className="space-y-1 text-gray-500">
                <li><a href="https://www.paris.fr/pages/l-encadrement-des-loyers-parisiens-en-vigueur-le-1er-aout-5309" target="_blank" className="hover:text-accent-400 transition-colors">Encadrement des loyers</a></li>
                <li><a href="https://www.anil.org" target="_blank" className="hover:text-accent-400 transition-colors">ANIL</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-xs text-center text-gray-600">© 2026 LoyerParis. Données indicatives.</div>
        </footer>
      </body>
    </html>
  );
}
