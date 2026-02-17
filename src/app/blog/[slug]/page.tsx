import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'LoyerParis' },
    publisher: { '@type': 'Organization', name: 'LoyerParis' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-accent-400 transition-colors">Accueil</Link>
          <span className="mx-2 text-gray-600">›</span>
          <Link href="/" className="hover:text-accent-400 transition-colors">Blog</Link>
          <span className="mx-2 text-gray-600">›</span>
          <span className="text-gray-300">{post.title}</span>
        </nav>
        <div className="text-sm text-gray-400 mb-4">{post.date} · {post.readTime} de lecture</div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-white">{post.title}</h1>
        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-accent-400 prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="font-bold text-lg mb-4 text-white">Autres articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="glass-card-hover p-4 block">
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-xs text-gray-400 mt-1">{p.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
