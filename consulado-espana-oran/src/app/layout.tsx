// ============================================================================
// CONSULADO GENERAL DE ESPAÑA EN ORÁN - ROOT LAYOUT
// ============================================================================

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Consulado de España en Orán',
    default: 'Consulado General de España en Orán - Sitio Oficial',
  },
  description: 'Sitio web oficial del Consulado General de España en Orán, Argelia. Sistema de cita previa, información sobre trámites consulares, visados, pasaportes, nacionalidad y más.',
  keywords: [
    'Consulado España Orán',
    'Consulado Español Argelia',
    'Cita previa consulado',
    'Visado España',
    'Pasaporte español',
    'Nacionalidad española',
    'Trámites consulares',
    'قنصلية إسبانيا وهران',
    'Consulat Espagne Oran',
  ],
  authors: [{ name: 'Consulado General de España en Orán' }],
  creator: 'Ministerio de Asuntos Exteriores, Unión Europea y Cooperación',
  publisher: 'Gobierno de España',
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
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['fr_FR', 'ar_DZ'],
    url: 'https://consulado-espana-oran.es',
    siteName: 'Consulado General de España en Orán',
    title: 'Consulado General de España en Orán - Sitio Oficial',
    description: 'Sistema de cita previa y trámites consulares del Consulado General de España en Orán, Argelia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Consulado General de España en Orán',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consulado General de España en Orán',
    description: 'Sistema oficial de cita previa y trámites consulares',
    creator: '@MAECgob',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'government',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#C60B1E' },
    { media: '(prefers-color-scheme: dark)', color: '#8B0000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        
        <Header />
        
        <main id="main-content" className="flex-1">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
