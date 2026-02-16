import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const dynamic = 'force-static';

export const metadata = {
  title: 'Killian Lacaque | Portfolio',
  description: 'Portfolio de Killian Lacaque. Curieux et passionné par les sciences, le trekking et la nature.',
  keywords: ['Développeur', 'Portfolio', 'Killian', 'Nature', 'Sciences', 'Trekking'],
  authors: [{ name: 'Killian Lacaque' }],
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Killian Lacaque | Portfolio',
    description: 'Curieux de nature. La découverte pour passion.',
    url: 'https://killianlacaque.com/',
    siteName: 'Killian Lacaque',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="google-site-verification" content="Y65NE1Berxi8y4Gcny87MqE1PKChyKA9Se47RSHBp7Y" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Limelight&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=SN+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"></link>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Killian Lacaque",
              "url": "https://killianlacaque.com",
              "logo": "https://killianlacaque.com/favicon.ico",
              "sameAs": [
                "https://github.com/killianlacaque",
                "https://linkedin.com/in/killianlacaque"
              ]
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://killianlacaque.com",
              "name": "Killian Lacaque | Portfolio",
              "publisher": {
                "@type": "Person",
                "name": "Killian Lacaque",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://killianlacaque.com/favicon.ico"
                }
              }
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}