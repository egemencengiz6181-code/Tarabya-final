import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata> {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'Services' });
 const origin = 'https://www.tarabyafinal.com';
 const path = `${origin}/${locale}/services`;

 return {
 title: t('meta_title'),
 description: t('meta_description'),
 alternates: {
 canonical: path,
 languages: {
  tr: `${origin}/tr/services`,
  en: `${origin}/en/services`,
 },
 },
 openGraph: {
 title: t('meta_title'),
 description: t('meta_description'),
 url: path,
 locale: locale === 'en' ? 'en_US' : 'tr_TR',
 images: [{ url: `${origin}/okul/okul.jpeg`, width: 1280, height: 720, alt: 'Tarabya Final Dershanesi' }],
 },
 twitter: {
 card: 'summary_large_image',
 title: t('meta_title'),
 description: t('meta_description'),
 images: [`${origin}/okul/okul.jpeg`],
 },
 };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
 return <>{children}</>;
}
