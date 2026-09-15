import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Blog | Ray Puerto Vallarta',
  robots: { index: false, follow: false },
}

export default function BlogPage() {
  redirect('/')
}
