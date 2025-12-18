import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: 'Killian Lacaque | Portfolio',
  },
  
  description: 'Portfolio de Killian Lacaque. Curieux et passionné par les sciences, le trekking et la nature.',
  
  keywords: ['Développeur', 'Portfolio', 'Killian', 'Nature', 'Exploration'],

  authors: [{ name: 'Killian Lacaque' }],
  
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Killian Lacaque | Développeur & Explorateur',
    description: 'Curieux de nature, fasciné par le fonctionnement du monde.',
    url: 'https://killianlacaque.vercel.app/', 
    siteName: 'Killian Lacaque',
    locale: 'fr_FR',
    type: 'website',
    
    /*
    images: [
      {
        url: 'https://killianlacaque.vercel.app/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
    */
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr"> {/* J'ai passé la langue en 'fr' vu que ton site est français */}
      <head>
        <meta name="google-site-verification" content="Y65NE1Berxi8y4Gcny87MqE1PKChyKA9Se47RSHBp7Y" />
        {/* Tes liens de polices... */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}