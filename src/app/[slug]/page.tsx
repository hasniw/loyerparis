import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allLocations } from '@/data/arrondissements';
import LeadFormWrapper from './LeadFormWrapper';

export function generateStaticParams() {
  return allLocations.map(l => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = allLocations.find(l => l.slug === params.slug);
  if (!loc) return {};
  return {
    title: `Loyer ${loc.name} - Prix moyen ${loc.prixMoyenM2} €/m² en 2026`,
    description: `Prix des loyers à ${loc.name} en 2026 : ${loc.prixMoyenM2} €/m² en moyenne. Studio ${loc.studio.min}-${loc.studio.max} €, T2 ${loc.t2.min}-${loc.t2.max} €, T3 ${loc.t3.min}-${loc.t3.max} €.`,
    openGraph: { title: `Loyer ${loc.name} 2026`, description: loc.description },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = allLocations.find(l => l.slug === params.slug);
  if (!loc) notFound();

  const tendanceLabel = loc.tendance === 'hausse' ? '📈 En hausse' : loc.tendance === 'baisse' ? '📉 En baisse' : '➡️ Stable';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: loc.name,
    description: loc.description,
    geo: { '@type': 'GeoCoordinates', addressCountry: 'FR' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600">Accueil</Link> <span className="mx-2">›</span>
          <span className="text-gray-800">{loc.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Loyer à {loc.name}</h1>
        <p className="text-lg text-gray-600 mb-8">{loc.description}</p>

        {/* Prix */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-primary-50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Prix moyen</div>
            <div className="text-3xl font-extrabold text-primary-700">{loc.prixMoyenM2} €<span className="text-base font-normal">/m²</span></div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Tendance</div>
            <div className="text-2xl font-bold">{tendanceLabel}</div>
            <div className="text-sm text-gray-500">{loc.tendancePct > 0 ? '+' : ''}{loc.tendancePct}% / an</div>
          </div>
          {loc.population && (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-sm text-gray-500 mb-1">Population</div>
              <div className="text-2xl font-bold">{loc.population.toLocaleString('fr-FR')}</div>
            </div>
          )}
        </div>

        {/* Grille loyers */}
        <h2 className="text-2xl font-bold mb-4">Loyers par type de logement</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { type: 'Studio', range: loc.studio },
            { type: 'T2', range: loc.t2 },
            { type: 'T3', range: loc.t3 },
          ].map(t => (
            <div key={t.type} className="border rounded-xl p-5">
              <div className="font-semibold text-lg mb-1">{t.type}</div>
              <div className="text-primary-700 font-bold text-xl">{t.range.min} – {t.range.max} €<span className="text-sm font-normal text-gray-400">/mois</span></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-primary-50 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold mb-2">Estimez votre loyer à {loc.shortName}</h2>
          <p className="text-gray-600 mb-4">Recevez une estimation personnalisée gratuite pour votre logement.</p>
          <LeadFormWrapper />
        </div>

        <Link href="/" className="text-primary-600 hover:underline font-medium">← Retour à l&apos;accueil</Link>
      </div>
    </>
  );
}
