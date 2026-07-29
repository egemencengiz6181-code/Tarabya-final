import type { Metadata } from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileStickyButton from '@/components/shared/MobileStickyButton';
import Providers from './providers';
import {locales} from '@/config/locales';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
 subsets: ['latin'],
 display: 'swap',
 variable: '--font-inter',
 weight: ['400', '500', '600', '700'],
 preload: true,
});

export function generateStaticParams() {
 return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'Index' });

 const origin = 'https://www.tarabyafinal.com';

 return {
 title: t('title'),
 description: t('description'),
 alternates: {
 canonical: `${origin}/${locale}`,
 },
 openGraph: {
 type: 'website',
 locale: 'tr_TR',
 siteName: 'Tarabya Final Dershanesi',
 title: t('title'),
 description: t('description'),
 url: `${origin}/${locale}`,
 images: [{
  url: `${origin}/okul/okul.jpeg`,
  width: 1280,
  height: 720,
  alt: 'Tarabya Final Dershanesi - Sarıyer İstanbul',
 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: t('title'),
 description: t('description'),
 images: [`${origin}/okul/okul.jpeg`],
 },
 };
}

export default async function LocaleLayout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: Promise<{locale: string}>;
}) {
 const {locale} = await params;
 const messages = await getMessages();

 return (
 <html lang={locale} className={inter.variable} suppressHydrationWarning>
 <head>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <meta name="keywords" content="LGS hazırlık, YKS hazırlık, dershane Sarıyer, Tarabya dershane, ortaokul dershanesi, lise dershanesi, Final Dershanesi İstanbul, öğrenci etütleri, eğitim danışmanlığı, rehberlik hizmeti, sınav hazırlık, akademik başarı, özel ders, okul destekleme, İstanbul dershane" />
  <meta name="googlebot" content="max-image-preview:large" />
  <meta name="googlebot" content="max-snippet:-1" />
  <meta name="category" content="education" />
  <link rel="apple-touch-icon" href="/logos/final%20logo%20png.png" />
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
  __html: JSON.stringify({
   "@context": "https://schema.org",
   "@type": "EducationalOrganization",
   "name": "Tarabya Final Dershanesi",
   "alternateName": "Final Dershane Tarabya Sarıyer",
   "description": "Sarıyer Tarabya'da LGS ve YKS hazırlık dersleri. 6-12. sınıf ve mezun programları.",
   "url": "https://www.tarabyafinal.com",
   "telephone": "+902122238283",
   "email": "tarabyaozelogretimkursu@abdkurumlari.com",
   "image": "https://www.tarabyafinal.com/okul/okul.jpeg",
   "logo": "https://www.tarabyafinal.com/logos/final%20logo%20png.png",
   "address": {
   "@type": "PostalAddress",
   "streetAddress": "Ferahevler, Aydın Sokak No:13",
   "addressLocality": "Sarıyer",
   "addressRegion": "İstanbul",
   "postalCode": "34457",
   "addressCountry": "TR"
   },
   "geo": {
   "@type": "GeoCoordinates",
   "latitude": 41.1728,
   "longitude": 29.0568
   },
   "openingHoursSpecification": [
   {
   "@type": "OpeningHoursSpecification",
   "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
   "opens": "09:00",
   "closes": "21:00"
   },
   {
   "@type": "OpeningHoursSpecification",
   "dayOfWeek": "Saturday",
   "opens": "09:00",
   "closes": "18:00"
   }
   ],
   "sameAs": ["https://www.tarabyafinal.com"]
  })
  }}
  />
 </head>
 <body className="bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen relative font-sans" suppressHydrationWarning>
  <Providers locale={locale} messages={messages ?? {}}>
  <Navbar />
  <main className="relative z-10 pb-20 md:pb-0">
   {children}
  </main>
  <Footer />
  {/* Mobil sticky buton — her sayfada görünür, layout seviyesinde */}
  <MobileStickyButton />
  </Providers>
 </body>
 </html>
 );
}
