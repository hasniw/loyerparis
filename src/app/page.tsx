'use client';
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { arrondissements, villesIDF, allLocations } from '@/data/arrondissements';
import { blogPosts } from '@/data/blog';
import LeadForm from '@/components/LeadForm';
import AnimatedCounter from '@/components/AnimatedCounter';
import FadeSection from '@/components/FadeSection';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

function TendanceBadge({ t, pct }: { t: string; pct: number }) {
  const cls = t === 'hausse'
    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    : t === 'baisse'
    ? 'bg-red-500/20 text-red-400 border-red-500/30'
    : 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${cls}`}>
      {t === 'hausse' ? '↑' : t === 'baisse' ? '↓' : '→'} {Math.abs(pct)}%
    </span>
  );
}

export default function Home() {
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const filtered = q.length > 1 ? allLocations.filter(l => l.name.toLowerCase().includes(q.toLowerCase()) || l.slug.includes(q.toLowerCase())).slice(0, 8) : [];
  const avgParis = (arrondissements.reduce((s, a) => s + a.prixMoyenM2, 0) / arrondissements.length);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization",
        name: "LoyerParis", url: "https://loyerparis.vercel.app",
        description: "Prix des loyers à Paris et Île-de-France en 2026"
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://loyerparis.vercel.app" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://loyerparis.vercel.app/blog/prix-loyer-paris-2026" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Quel est le prix moyen d'un loyer à Paris en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le loyer moyen à Paris est d'environ 30€/m². Il varie de 25€/m² dans le 19e à 38€/m² dans le 6e arrondissement." }},
          { "@type": "Question", name: "Quels sont les arrondissements les moins chers de Paris ?", acceptedAnswer: { "@type": "Answer", text: "Les 19e, 20e et 13e arrondissements sont les plus abordables, avec des loyers moyens entre 25€ et 28€/m²." }},
          { "@type": "Question", name: "L'encadrement des loyers s'applique-t-il à Paris ?", acceptedAnswer: { "@type": "Answer", text: "Oui, l'encadrement des loyers est en vigueur à Paris depuis 2019. Le loyer ne peut pas dépasser un plafond fixé par arrêté préfectoral selon le quartier et le type de logement." }},
          { "@type": "Question", name: "Comment estimer le loyer d'un appartement à Paris ?", acceptedAnswer: { "@type": "Answer", text: "Utilisez notre outil d'estimation gratuit. Le loyer dépend de l'arrondissement, de la surface, du type de logement et de l'état du bien." }},
          { "@type": "Question", name: "Les loyers en Île-de-France sont-ils moins chers qu'à Paris ?", acceptedAnswer: { "@type": "Answer", text: "Oui, les loyers en IDF sont 30% à 50% moins chers. Boulogne-Billancourt et Neuilly restent proches des prix parisiens, tandis que des villes comme Montreuil ou Créteil sont plus abordables." }}
        ]
      }) }} />
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-16">
        <HeroScene />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-navy-900/20 to-navy-900 pointer-events-none" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="text-accent-500">Loyer</span>Paris
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Prix des loyers à Paris en 2026. Arrondissement par arrondissement, en temps réel.
          </p>
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className={`relative rounded-2xl transition-all duration-300 ${focused ? 'glow-border' : 'border border-white/10'}`}>
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Rechercher un arrondissement ou une ville..."
                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl text-white text-lg placeholder-gray-500 focus:outline-none"
              />
            </div>
            {filtered.length > 0 && focused && (
              <div className="absolute top-full mt-2 w-full glass-card max-h-72 overflow-y-auto z-50">
                {filtered.map(l => (
                  <Link key={l.slug} href={`/${l.slug}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/10 transition-colors first:rounded-t-2xl last:rounded-b-2xl">
                    <span className="font-medium text-white">{l.name}</span>
                    <span className="text-accent-400 font-bold">{l.prixMoyenM2} €/m²</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* Stats */}
      <FadeSection>
        <section className="py-16 section-darker">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Prix moyen Paris', value: avgParis, suffix: ' €/m²', decimals: 1 },
              { label: 'Arrondissements', value: 20, suffix: '', decimals: 0 },
              { label: 'Villes IDF', value: 10, suffix: '', decimals: 0 },
              { label: 'Année données', value: 2026, suffix: '', decimals: 0 },
            ].map(s => (
              <div key={s.label} className="glass-card p-6">
                <div className="text-2xl md:text-3xl font-extrabold text-accent-400">
                  <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-sm text-gray-500 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* Arrondissements */}
      <FadeSection delay={100}>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Les 20 arrondissements</h2>
            <p className="text-gray-500 mb-10">Prix moyens au m² par arrondissement parisien</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {arrondissements.map((a, i) => (
                <FadeSection key={a.slug} delay={i * 50}>
                  <Link href={`/${a.slug}`} className="glass-card-hover p-5 block">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">{a.shortName}</span>
                      <TendanceBadge t={a.tendance} pct={a.tendancePct} />
                    </div>
                    <div className="text-3xl font-extrabold text-accent-400 mb-1">
                      {a.prixMoyenM2} €<span className="text-sm font-normal text-gray-500">/m²</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Studio: {a.studio.min}–{a.studio.max} € · T2: {a.t2.min}–{a.t2.max} €
                    </div>
                    {/* Mini bar showing relative price */}
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full" style={{ width: `${((a.prixMoyenM2 - 20) / 20) * 100}%` }} />
                    </div>
                  </Link>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Villes IDF */}
      <FadeSection delay={100}>
        <section className="py-20 section-darker">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Villes d&apos;Île-de-France</h2>
            <p className="text-gray-500 mb-10">Explorez les prix hors Paris</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {villesIDF.map((v, i) => (
                <FadeSection key={v.slug} delay={i * 60}>
                  <Link href={`/${v.slug}`} className="glass-card-hover p-5 block">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-white">{v.shortName}</span>
                      <TendanceBadge t={v.tendance} pct={v.tendancePct} />
                    </div>
                    <div className="text-3xl font-extrabold text-accent-400 mb-1">
                      {v.prixMoyenM2} €<span className="text-sm font-normal text-gray-500">/m²</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Studio: {v.studio.min}–{v.studio.max} € · T2: {v.t2.min}–{v.t2.max} €
                    </div>
                    <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full" style={{ width: `${((v.prixMoyenM2 - 10) / 25) * 100}%` }} />
                    </div>
                  </Link>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Blog */}
      <FadeSection delay={100}>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Guides & conseils</h2>
            <p className="text-gray-500 mb-10">Tout savoir sur le marché locatif parisien</p>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="glass-card-hover p-6 block group">
                  <div className="text-xs text-gray-500 mb-3">{p.date} · {p.readTime}</div>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-accent-400 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* FAQ */}
      <FadeSection delay={100}>
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Questions fréquentes</h2>
            <p className="text-gray-500 mb-10">Tout savoir sur les loyers à Paris</p>
            <div className="space-y-4">
              {[
                { q: "Quel est le prix moyen d'un loyer à Paris en 2026 ?", a: "Le loyer moyen à Paris est d'environ 30€/m². Il varie de 25€/m² dans le 19e à 38€/m² dans le 6e arrondissement." },
                { q: "Quels sont les arrondissements les moins chers ?", a: "Les 19e, 20e et 13e arrondissements sont les plus abordables, avec des loyers moyens entre 25€ et 28€/m²." },
                { q: "L'encadrement des loyers s'applique-t-il à Paris ?", a: "Oui, depuis 2019. Le loyer ne peut pas dépasser un plafond fixé par arrêté préfectoral selon le quartier et le type de logement." },
                { q: "Comment estimer le loyer d'un appartement ?", a: "Utilisez notre outil d'estimation gratuit ci-dessous. Le loyer dépend de l'arrondissement, de la surface et du type de logement." },
                { q: "Les loyers en IDF sont-ils moins chers ?", a: "Oui, 30% à 50% moins chers en moyenne. Boulogne et Neuilly restent proches des prix parisiens, Montreuil ou Créteil sont plus abordables." },
              ].map((faq, i) => (
                <FadeSection key={i} delay={i * 60}>
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-lg text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Lead Form */}
      <section id="estimez" className="py-20 section-darker">
        <div className="max-w-2xl mx-auto px-4">
          <FadeSection>
            <div className="glass-card p-8 md:p-12 glow-border">
              <h2 className="text-3xl font-extrabold mb-2 text-center">Estimez votre loyer</h2>
              <p className="text-center text-gray-400 mb-8">Recevez une estimation personnalisée gratuite</p>
              <LeadForm />
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}
