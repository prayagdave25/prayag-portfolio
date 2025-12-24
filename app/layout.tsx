import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prayag Vikram Dave | Senior Technical Lead | FinTech Architect | AI Engineer',
  description: 'From architecting financial systems that process millions of transactions daily to building AI applications that unlock data intelligence at scale. 10 years of enterprise FinTech experience with expertise in Java, Spring Boot, AI, and Vector Databases.',
  keywords: [
    'FinTech Architect',
    'AI Engineer',
    'Senior Technical Lead',
    'RAG',
    'Vector Databases',
    'Java',
    'Spring Boot',
    'Weaviate',
    'LangChain',
    'FastAPI',
    'Next.js',
    'Enterprise Systems',
    'Microservices',
  ],
  authors: [{ name: 'Prayag Vikram Dave' }],
  creator: 'Prayag Vikram Dave',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prayagdave.com',
    title: 'Prayag Vikram Dave | Senior Technical Lead | FinTech Architect | AI Engineer',
    description: 'From architecting financial systems that process millions of transactions daily to building AI applications that unlock data intelligence at scale.',
    siteName: 'Prayag Vikram Dave Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prayag Vikram Dave | Senior Technical Lead | FinTech Architect | AI Engineer',
    description: 'From architecting financial systems that process millions of transactions daily to building AI applications that unlock data intelligence at scale.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD structured data for Person schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prayag Vikram Dave',
    jobTitle: 'Senior Technical Lead',
    description: 'FinTech Architect and AI Engineer with 10 years of experience building national-scale financial infrastructure and intelligent RAG systems',
    url: 'https://prayagdave.com',
    sameAs: [
      'https://github.com/prayagdave25',
      'https://www.linkedin.com/in/prayag-dave-2504/',
    ],
    knowsAbout: [
      'FinTech Architecture',
      'AI Engineering',
      'RAG (Retrieval-Augmented Generation)',
      'Vector Databases',
      'Java',
      'Spring Boot',
      'Python',
      'FastAPI',
      'Weaviate',
      'LangChain',
      'Microservices',
      'Enterprise Systems',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
