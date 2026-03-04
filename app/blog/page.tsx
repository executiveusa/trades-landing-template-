import { Metadata } from 'next'
import Link from 'next/link'
import { BlogCard, BlogArticle } from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog | Puerto Vallarta Yeso & Acabados',
  description: 'Consejos y recomendaciones sobre diseño, mantenimiento de casa y real estate en Puerto Vallarta',
}

function getBlogArticles(): BlogArticle[] {
  const blog = require('@/content/blog.json')
  return blog.articles.sort((a: BlogArticle, b: BlogArticle) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export default function BlogPage() {
  const articles = getBlogArticles()

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--brand-bg)] to-white">
      {/* Header */}
      <section className="py-20 border-b border-[var(--brand-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-[var(--brand-text)] mb-4">
            Blog de Diseño & Real Estate
          </h1>
          <p className="text-xl text-gray-600">
            Consejos, recomendaciones e información valiosa sobre diseño de interiores, 
            mantenimiento de hogar y el mercado inmobiliario de Puerto Vallarta.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay artículos disponibles aún.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--brand-accent)] bg-opacity-5 border-t border-[var(--brand-border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--brand-text)] mb-4">
            ¿Listo para tu Transformación?
          </h2>
          <p className="text-gray-600 mb-8">
            Si tienes preguntas sobre tu proyecto, nuestro equipo está aquí para ayudarte.
          </p>
          <Link
            href="#contact"
            className="inline-block px-8 py-3 bg-[var(--brand-accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </main>
  )
}
