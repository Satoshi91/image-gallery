import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '画像ギャラリー',
  description: 'Image gallery application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}