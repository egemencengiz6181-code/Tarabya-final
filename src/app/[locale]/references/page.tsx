import { getTranslations } from 'next-intl/server';
import ReferencesContent, { type TestimonialItem } from './_content';

export default async function ReferencesPage() {
  const tRef  = await getTranslations('References');
  const tTest = await getTranslations('Testimonials');

  let rawItems: unknown;
  try { rawItems = tTest.raw('items'); } catch { rawItems = []; }
  const testimonialItems: TestimonialItem[] = Array.isArray(rawItems)
    ? rawItems
    : typeof rawItems === 'object' && rawItems !== null
      ? (Object.values(rawItems) as TestimonialItem[])
      : [];

  return (
    <ReferencesContent
      pageSubtitle={tRef('subtitle')}
      pageTitle={tRef('title')}
      testimonialItems={testimonialItems}
      testimonialSubtitle={tTest('subtitle')}
      testimonialTitle={tTest('title')}
    />
  );
}
