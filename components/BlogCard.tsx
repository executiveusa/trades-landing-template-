'use client'

import Link from 'next/link'
import { formatDate } from '@/lib/date-utils'

export interface BlogArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  content?: string
}

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[var(--brand-border)] bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video overflow-hidden bg-gray-200">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 bg-[var(--brand-accent)] bg-opacity-10 text-[var(--brand-accent)] rounded-full">
            {article.category}
          </span>
          <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
        </div>
        <h3 className="text-lg font-bold text-[var(--brand-text)] mb-2 group-hover:text-[var(--brand-accent)] transition-colors">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{article.author}</span>
          <Link 
            href={`/blog/${article.slug}`}
            className="text-sm font-semibold text-[var(--brand-accent)] hover:underline"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  )
}
