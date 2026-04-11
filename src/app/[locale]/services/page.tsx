import { getTranslations } from 'next-intl/server';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  const cards = [
    // LGS (Ortaokul)
    { slug: '6-sinif',                span: 'md:col-span-1', title: t('items.6-sinif.title'),               description: t('items.6-sinif.description') },
    { slug: '7-sinif',                span: 'md:col-span-1', title: t('items.7-sinif.title'),               description: t('items.7-sinif.description') },
    { slug: '8-sinif',                span: 'md:col-span-1', title: t('items.8-sinif.title'),               description: t('items.8-sinif.description') },
    { slug: '8-sinif-vip',            span: 'md:col-span-1', title: t('items.8-sinif-vip.title'),           description: t('items.8-sinif-vip.description') },
    { slug: '8-sinif-vip-ozel-dersli', span: 'md:col-span-2', title: t('items.8-sinif-vip-ozel-dersli.title'), description: t('items.8-sinif-vip-ozel-dersli.description') },
    // YKS (Lise + Mezun)
    { slug: '10-sinif',               span: 'md:col-span-1', title: t('items.10-sinif.title'),              description: t('items.10-sinif.description') },
    { slug: '11-sinif',               span: 'md:col-span-1', title: t('items.11-sinif.title'),              description: t('items.11-sinif.description') },
    { slug: '11-sinif-vip',           span: 'md:col-span-1', title: t('items.11-sinif-vip.title'),          description: t('items.11-sinif-vip.description') },
    { slug: '12-sinif',               span: 'md:col-span-1', title: t('items.12-sinif.title'),              description: t('items.12-sinif.description') },
    { slug: '12-sinif-vip',           span: 'md:col-span-1', title: t('items.12-sinif-vip.title'),          description: t('items.12-sinif-vip.description') },
    { slug: 'mezun',                  span: 'md:col-span-1', title: t('items.mezun.title'),                 description: t('items.mezun.description') },
    // Destek
    { slug: 'deneme-kulubu',          span: 'md:col-span-1', title: t('items.deneme-kulubu.title'),         description: t('items.deneme-kulubu.description') },
    { slug: 'ozel-ders',              span: 'md:col-span-1', title: t('items.ozel-ders.title'),             description: t('items.ozel-ders.description') },
  ];

  return (
    <ServicesPageClient
      pageTitle={t('title')}
      pageSubtitle={t('subtitle')}
      sectionOrtaokul={t('sections.ortaokul')}
      sectionLise={t('sections.lise')}
      sectionDestek={t('sections.destek')}
      cards={cards}
    />
  );
}
