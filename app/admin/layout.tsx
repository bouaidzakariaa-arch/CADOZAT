import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administration — CADOZAT',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  )
}