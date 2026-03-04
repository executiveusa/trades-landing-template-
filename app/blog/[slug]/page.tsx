import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/date-utils'
import { BlogArticle } from '@/components/BlogCard'

function getBlogArticles(): BlogArticle[] {
  const blog = require('@/content/blog.json')
  return blog.articles
}

function getBlogArticle(slug: string): BlogArticle | null {
  const articles = getBlogArticles()
  return articles.find((article) => article.slug === slug) || null
}

export async function generateMetadata(props: any): Promise<Metadata> {
  // `props` may contain promises depending on Next.js version
  const { params, searchParams } = props as any
  const slug = typeof params === 'object' ? (params.slug || (await params)?.slug) : undefined
  const article = getBlogArticle(slug)
  
  const lang = typeof searchParams === 'object' && searchParams.lang === 'en' ? 'en' : 'es'

  if (!article) {
    return {
      title: lang === 'en' ? 'Article not found' : 'Artículo no encontrado',
    }
  }

  const title = lang === 'en' ? article.title_en || article.title : article.title
  const desc = lang === 'en' ? article.excerpt_en || article.excerpt : article.excerpt

  return {
    title: `${title} | Blog`,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [article.image],
      type: 'article',
    },
  }
}

export default async function BlogArticlePage(props: any) {
  const { params, searchParams } = props
  const { slug } = typeof params === 'object' ? await params : params
  const lang = searchParams && typeof searchParams.lang === 'string' && searchParams.lang === 'en' ? 'en' : 'es'
  const article = getBlogArticle(slug)

  if (!article) {
    notFound()
  }

  const allArticles = getBlogArticles()
  const currentIndex = allArticles.findIndex((a) => a.slug === slug)
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="w-full h-96 overflow-hidden bg-gray-200">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-semibold px-3 py-1 bg-[var(--brand-accent)] bg-opacity-10 text-[var(--brand-accent)] rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
        </div>

        <h1 className="text-5xl font-bold text-[var(--brand-text)] mb-4">
          {lang === 'en' ? article.title_en || article.title : article.title}
        </h1>

        <div className="flex items-center justify-between border-t border-b border-[var(--brand-border)] py-4 mb-8">
          <div>
            <p className="text-sm text-gray-600">Por:</p>
            <p className="font-semibold text-[var(--brand-text)]">{article.author}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            {article.content ? Math.ceil(article.content.length / 200) : 5} min de lectura
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.content && article.content.split('\n').map((line, idx) => {
            if (line.startsWith('# ')) {
              return (
                <h2 key={idx} className="text-3xl font-bold text-[var(--brand-text)] mt-8 mb-4">
                  {line.replace('# ', '')}
                </h2>
              )
            }
            if (line.startsWith('## ')) {
              return (
                <h3 key={idx} className="text-2xl font-bold text-[var(--brand-text)] mt-6 mb-3">
                  {line.replace('## ', '')}
                </h3>
              )
            }
            if (line.startsWith('### ')) {
              return (
                <h4 key={idx} className="text-xl font-bold text-[var(--brand-text)] mt-4 mb-2">
                  {line.replace('### ', '')}
                </h4>
              )
            }
            if (line.startsWith('- ')) {
              return (
                <li key={idx} className="ml-6 text-gray-700 mb-2">
                  {line.replace('- ', '')}
                </li>
              )
            }
            if (line.trim()) {
              return (
                <p key={idx} className="text-gray-700 mb-4 leading-relaxed">
                  {line}
                </p>
              )
            }
            return null
          })}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 py-8 border-t border-[var(--brand-border)]">
          {previousArticle ? (
            <Link
              href={`/blog/${previousArticle.slug}`}
              className="p-4 border border-[var(--brand-border)] rounded-lg hover:bg-[var(--brand-bg)] transition-colors"
            >
              <p className="text-sm text-gray-500 mb-2">{lang === 'en' ? '← Previous Article' : '← Artículo Anterior'}</p>
              <p className="font-semibold text-[var(--brand-text)] line-clamp-2">
                {lang === 'en' ? previousArticle.title_en || previousArticle.title : previousArticle.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link
              href={`/blog/${nextArticle.slug}`}
              className="p-4 border border-[var(--brand-border)] rounded-lg hover:bg-[var(--brand-bg)] transition-colors text-right"
            >
              <p className="text-sm text-gray-500 mb-2">{lang === 'en' ? 'Next Article →' : 'Siguiente Artículo →'}</p>
              <p className="font-semibold text-[var(--brand-text)] line-clamp-2">
                {lang === 'en' ? nextArticle.title_en || nextArticle.title : nextArticle.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-[var(--brand-accent)] font-semibold hover:underline"
          >
            {lang === 'en' ? '← Back to Blog' : '← Volver al Blog'}
          </Link>
        </div>
      </article>

      {/* Related CTA */}
      <section className="bg-[var(--brand-accent)] bg-opacity-5 border-t border-[var(--brand-border)] py-16 mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--brand-text)] mb-4">
            {lang === 'en' ? 'Need Help With Your Project?' : '¿Necesitas Ayuda con tu Proyecto?'}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'en' ? 'Reach out to our expert team for a personalized quote.' : 'Contacta a nuestro equipo de expertos para una cotización personalizada.'}
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-3 bg-[var(--brand-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            {lang === 'en' ? 'Contact Now' : 'Contactar Ahora'}
          </Link>
        </div>
      </section>
    </main>
  )
}
