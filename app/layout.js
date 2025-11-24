import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: 'Killian Lacaque | Portfolio',
  },
  
  description: 'Portfolio de Killian Lacaque. Curieux et passionné par les sciences, le trekking et la nature. Découvrez mon univers, mes projets et mes explorations.',
  
  keywords: [
    'Développeur', 
    'Portfolio', 
    'Killian', 
    'Astronomie', 
    'Trekking', 
    'Nature', 
    'Photographie',
    'Exploration'
  ],

  // Auteur du site
  authors: [{ name: 'Killian Lacaque' }],
  
  // Pour dire aux robots d'indexer la page
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Killian Lacaque | Développeur & Explorateur',
    description: 'Curieux de nature, fasciné par le fonctionnement du monde. Découvrez mon portfolio mêlant code et passions.',
    url: 'https://https://portfolio-three-nu-49.vercel.app/', // Remplace par ta vraie URL quand tu en auras une
    siteName: 'Killian Lacaque',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://https://portfolio-three-nu-49.vercel.app/og-image.jpg', // Idéalement, une image de toi ou de ton univers
        width: 1200,
        height: 630,
        alt: 'Killian Lacaque Portfolio',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Y65NE1Berxi8y4Gcny87MqE1PKChyKA9Se47RSHBp7Y" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" 
          rel="stylesheet"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" 
          rel="stylesheet"
        >
        </link>
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
