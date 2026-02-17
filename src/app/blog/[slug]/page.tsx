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
          <Link href="/" className="hover:text-primary-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/blog/prix-loyer-paris-2026" className="hover:text-primary-600">Blog</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{post.title}</span>
        </nav>
        <div className="text-sm text-gray-400 mb-4">{post.date} · {post.readTime} de lecture</div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">{post.title}</h1>
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-bold text-lg mb-4">Autres articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="border rounded-lg p-4 hover:shadow transition-all">
                <div className="font-semibold group-hover:text-primary-600">{p.title}</div>
                <div className="text-xs text-gray-400 mt-1">{p.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
