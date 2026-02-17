import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allLocations, arrondissements, villesIDF } from '@/data/arrondissements';
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

function PriceBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm text-gray-400 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-white">{value} €/m²</span>
      </div>
    </div>
  );
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = allLocations.find(l => l.slug === params.slug);
  if (!loc) notFound();

  const tendanceColor = loc.tendance === 'hausse' ? 'text-emerald-400' : loc.tendance === 'baisse' ? 'text-red-400' : 'text-gray-400';
  const tendanceIcon = loc.tendance === 'hausse' ? '↑' : loc.tendance === 'baisse' ? '↓' : '→';

  // Nearby locations
  const pool = loc.type === 'arrondissement' ? arrondissements : villesIDF;
  const nearby = pool
    .filter(l => l.slug !== loc.slug)
    .sort((a, b) => Math.abs(a.prixMoyenM2 - loc.prixMoyenM2) - Math.abs(b.prixMoyenM2 - loc.prixMoyenM2))
    .slice(0, 4);

  const maxPrice = Math.max(loc.prixMoyenM2, ...pool.map(l => l.prixMoyenM2));

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

      {/* Hero header */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 via-navy-900 to-navy-800" />
        <div className="relative max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-accent-400 transition-colors">Accueil</Link>
            <span className="mx-2 text-gray-600">›</span>
            <span className="text-gray-300">{loc.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{loc.name}</h1>
          <div className="flex flex-wrap items-end gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Prix moyen au m²</div>
              <div className="text-6xl md:text-8xl font-extrabold text-accent-400 leading-none">
                {loc.prixMoyenM2}<span className="text-2xl md:text-3xl text-gray-500 ml-2">€/m²</span>
              </div>
            </div>
            <div className="mb-2">
              <span className={`text-2xl font-bold ${tendanceColor}`}>
                {tendanceIcon} {loc.tendancePct > 0 ? '+' : ''}{loc.tendancePct}%
              </span>
              <div className="text-sm text-gray-500">par an</div>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">{loc.description}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-16">
        {/* Price comparison bar chart */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">Comparatif des prix</h2>
          <div className="glass-card p-6">
            <PriceBar label={loc.shortName} value={loc.prixMoyenM2} max={maxPrice} />
            {nearby.map(n => (
              <PriceBar key={n.slug} label={n.shortName} value={n.prixMoyenM2} max={maxPrice} />
            ))}
          </div>
        </section>

        {/* Loyers par type */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">Loyers par type de logement</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { type: 'Studio', emoji: '🏠', range: loc.studio },
              { type: 'T2', emoji: '🏢', range: loc.t2 },
              { type: 'T3', emoji: '🏘️', range: loc.t3 },
            ].map(t => (
              <div key={t.type} className="glass-card p-6 text-center">
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="font-bold text-lg text-white mb-1">{t.type}</div>
                <div className="text-2xl font-extrabold text-accent-400">
                  {t.range.min} – {t.range.max} €
                </div>
                <div className="text-sm text-gray-500">/mois</div>
              </div>
            ))}
          </div>
        </section>

        {/* Population */}
        {loc.population && (
          <section className="glass-card p-6 flex items-center gap-6">
            <div className="text-4xl">👥</div>
            <div>
              <div className="text-sm text-gray-500">Population estimée</div>
              <div className="text-3xl font-extrabold text-white">{loc.population.toLocaleString('fr-FR')} hab.</div>
            </div>
          </section>
        )}

        {/* Nearby */}
        <section>
          <h2 className="text-2xl font-extrabold mb-6">Quartiers proches</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {nearby.map(n => (
              <Link key={n.slug} href={`/${n.slug}`} className="glass-card-hover p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{n.name}</div>
                  <div className="text-sm text-gray-500">{n.tendance === 'hausse' ? '↑' : n.tendance === 'baisse' ? '↓' : '→'} {Math.abs(n.tendancePct)}% / an</div>
                </div>
                <div className="text-2xl font-extrabold text-accent-400">{n.prixMoyenM2} €<span className="text-sm font-normal text-gray-500">/m²</span></div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass-card glow-border p-8 md:p-12">
          <h2 className="text-2xl font-extrabold mb-2 text-center">Estimez votre loyer à {loc.shortName}</h2>
          <p className="text-center text-gray-400 mb-6">Recevez une estimation personnalisée gratuite</p>
          <LeadFormWrapper />
        </section>

        <Link href="/" className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-medium transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
