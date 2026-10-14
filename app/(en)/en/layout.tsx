import RootShell from '@/components/RootShell'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('en')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
