import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AR KORE LOGICS - Career Navigation Platform',
  description: 'Learn skills, follow structured roadmaps, get mentored, and become industry-ready with AR KORE LOGICS',
  generator: 'v0.app',
  openGraph: {
    title: 'AR KORE LOGICS - Career Navigation Platform',
    description: 'Learn skills, follow structured roadmaps, get mentored, and become industry-ready with AR KORE LOGICS',
    url: 'https://arkorelogics.com',
    siteName: 'AR KORE LOGICS',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'AR KORE LOGICS Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR KORE LOGICS - Career Navigation Platform',
    description: 'Learn skills, follow structured roadmaps, get mentored, and become industry-ready with AR KORE LOGICS',
    images: ['/placeholder.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-void dark`}>
      <body className="font-sans antialiased bg-void text-white selection:bg-brand-primary/30 selection:text-white">
        <ScrollProgress />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
