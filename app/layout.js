// app/layout.js

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: 'Killian Lacaque | Portfolio',
  },
  description: 'Portfolio de Killian Lacaque...', // (votre description)
  keywords: [ /* ... */ ],
  authors: [{ name: 'Killian Lacaque' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Killian Lacaque | Développeur & Explorateur',
    description: 'Curieux de nature...', // (votre description OG)
    url: 'https://killianlacaque.vercel.app/',
    siteName: 'Killian Lacaque',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://killianlacaque.vercel.app/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Killian Lacaque Portfolio',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr"> {/* J'ai mis 'fr' au lieu de 'en' */}
      <head>
        {/* On n'a plus besoin de la balise link pour le favicon ici */}
        <meta name="google-site-verification" content="Y65NE1Berxi8y4Gcny87MqE1PKChyKA9Se47RSHBp7Y" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Vos autres liens de polices */}
        <link href="..." rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}