import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

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
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="border-b bg-white sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-700">🏠 LoyerParis</Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-primary-600">Accueil</Link>
              <Link href="/blog/prix-loyer-paris-2026" className="hover:text-primary-600">Blog</Link>
              <Link href="#estimez" className="hover:text-primary-600">Estimer</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-3">LoyerParis</h3>
              <p>Prix des loyers à Paris et Île-de-France. Données mises à jour en 2026.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Navigation</h3>
              <ul className="space-y-1">
                <li><Link href="/" className="hover:text-white">Accueil</Link></li>
                <li><Link href="/blog/prix-loyer-paris-2026" className="hover:text-white">Blog</Link></li>
                <li><Link href="/paris-1er" className="hover:text-white">Paris 1er</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Ressources</h3>
              <ul className="space-y-1">
                <li><a href="https://www.paris.fr/pages/l-encadrement-des-loyers-parisiens-en-vigueur-le-1er-aout-5309" target="_blank" className="hover:text-white">Encadrement des loyers</a></li>
                <li><a href="https://www.anil.org" target="_blank" className="hover:text-white">ANIL</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-xs text-center">© 2026 LoyerParis. Données indicatives.</div>
        </footer>
      </body>
    </html>
  );
}
