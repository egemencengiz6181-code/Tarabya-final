import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tarabyafinal.com'),
  title: {
    default: 'Tarabya Final Dershanesi',
    template: '%s | Tarabya Final Dershanesi',
  },
  description: "Küçükçekmece — Tarabya Final Dershanesi. LGS'de hedef liseye giden yol.",
  authors: [{ name: 'Tarabya Final Dershanesi', url: 'https://www.tarabyafinal.com' }],
  creator: 'Tarabya Final Dershanesi',
  publisher: 'Tarabya Final Dershanesi',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/logos/final%20logo%20png.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tarabya Final Dershanesi',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tarabyafinalegitimkurumlari',
    creator: '@tarabyafinalegitimkurumlari',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
