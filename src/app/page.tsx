'use client';
import { useState } from 'react';
import Link from 'next/link';
import { arrondissements, villesIDF, allLocations } from '@/data/arrondissements';
import { blogPosts } from '@/data/blog';
import LeadForm from '@/components/LeadForm';

function TendanceBadge({ t, pct }: { t: string; pct: number }) {
  const cls = t === 'hausse' ? 'bg-green-100 text-green-700' : t === 'baisse' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600';
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{t === 'hausse' ? '↑' : t === 'baisse' ? '↓' : '→'} {Math.abs(pct)}%</span>;
}

export default function Home() {
  const [q, setQ] = useState('');
  const filtered = q.length > 1 ? allLocations.filter(l => l.name.toLowerCase().includes(q.toLowerCase()) || l.slug.includes(q.toLowerCase())) : [];
  const avgParis = (arrondissements.reduce((s, a) => s + a.prixMoyenM2, 0) / arrondissements.length).toFixed(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Prix des loyers à Paris en 2026</h1>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">Consultez les prix moyens par arrondissement et ville d&apos;Île-de-France. Données actualisées, tendances et conseils.</p>
          <div className="relative max-w-xl mx-auto">
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher un arrondissement ou une ville..." className="w-full px-5 py-4 rounded-xl text-gray-900 text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-300" />
            {filtered.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border max-h-64 overflow-y-auto z-50">
                {filtered.map(l => (
                  <Link key={l.slug} href={`/${l.slug}`} className="flex items-center justify-between px-5 py-3 hover:bg-primary-50 text-gray-800">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-primary-600 font-bold">{l.prixMoyenM2} €/m²</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Prix moyen Paris', value: `${avgParis} €/m²` },
            { label: 'Arrondissements', value: '20' },
            { label: 'Villes IDF', value: '10' },
            { label: 'Données', value: '2026' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-primary-700">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Arrondissements */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Les 20 arrondissements de Paris</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {arrondissements.map(a => (
              <Link key={a.slug} href={`/${a.slug}`} className="border rounded-xl p-5 hover:shadow-lg hover:border-primary-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800 group-hover:text-primary-600">{a.shortName}</span>
                  <TendanceBadge t={a.tendance} pct={a.tendancePct} />
                </div>
                <div className="text-2xl font-extrabold text-primary-700">{a.prixMoyenM2} €<span className="text-sm font-normal text-gray-400">/m²</span></div>
                <div className="text-xs text-gray-500 mt-2">Studio: {a.studio.min}–{a.studio.max} € · T2: {a.t2.min}–{a.t2.max} €</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Villes IDF */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Villes d&apos;Île-de-France</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {villesIDF.map(v => (
              <Link key={v.slug} href={`/${v.slug}`} className="bg-white border rounded-xl p-5 hover:shadow-lg hover:border-primary-300 transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800 group-hover:text-primary-600">{v.shortName}</span>
                  <TendanceBadge t={v.tendance} pct={v.tendancePct} />
                </div>
                <div className="text-2xl font-extrabold text-primary-700">{v.prixMoyenM2} €<span className="text-sm font-normal text-gray-400">/m²</span></div>
                <div className="text-xs text-gray-500 mt-2">Studio: {v.studio.min}–{v.studio.max} € · T2: {v.t2.min}–{v.t2.max} €</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Guides & conseils</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="border rounded-xl p-6 hover:shadow-lg transition-all group">
                <div className="text-xs text-gray-400 mb-2">{p.date} · {p.readTime}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600">{p.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="estimez" className="py-16 bg-primary-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Estimez votre loyer</h2>
          <p className="text-center text-gray-600 mb-8">Recevez une estimation personnalisée gratuite</p>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
