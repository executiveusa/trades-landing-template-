import RootShell from '@/components/RootShell'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata('es')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>
}
