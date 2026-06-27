import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import ConditionalChrome from '@/components/layout/ConditionalChrome';
import { readSettings } from '@/lib/admin/dataStore';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await readSettings();

  let metadataBase: URL | undefined;
  if (seo.siteUrl) {
    try {
      metadataBase = new URL(seo.siteUrl);
    } catch {
      metadataBase = undefined;
    }
  }

  return {
    title: seo.siteTitle,
    description: seo.siteDescription,
    keywords: seo.siteKeywords,
    robots: seo.robotsIndex ? { index: true, follow: true } : { index: false, follow: false },
    metadataBase,
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: 'website',
      images: [seo.ogImage],
      ...(seo.siteUrl ? { url: seo.siteUrl } : {}),
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.ogTitle,
      description: seo.ogDescription,
      images: [seo.ogImage],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${jakarta.variable} ${manrope.variable}`}>
      <body className="bg-brand-white font-sans text-brand-text">
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
