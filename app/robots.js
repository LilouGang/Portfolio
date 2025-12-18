export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://killianlacaque.vercel.app/sitemap.xml',
  };
}
