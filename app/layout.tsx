import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

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
        <link rel="stylesheet" href="/widget.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
        
        {/* Resume Chat Widget */}
        <div id="resume-chat-widget" />
        
        {/* Chat Widget Configuration */}
        <Script id="chat-config" strategy="beforeInteractive">
          {`
            window.RESUME_CHAT_CONFIG = {
              backendUrl: '${process.env.NEXT_PUBLIC_VECTORLOOM_BACKEND_URL || ''}',
              credentials: {
                deployment: 'Custom',
                url: '${process.env.NEXT_PUBLIC_QDRANT_URL || ''}',
                key: '${process.env.NEXT_PUBLIC_QDRANT_API_KEY || ''}',
                db_type: 'qdrant'
              },
              theme: {
                primaryColor: '#4F46E5',
                headerText: 'Ask about my Resume',
                welcomeMessage: 'Hi! Ask me anything about my experience, skills, or projects.',
                placeholder: 'Ask a question...',
                suggestedQuestions: [
                  'What are your main technical skills?',
                  'Tell me about your FinTech experience',
                  'What AI projects have you worked on?',
                  'What technologies do you work with?'
                ]
              }
            };
          `}
        </Script>
        <Script src="/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
