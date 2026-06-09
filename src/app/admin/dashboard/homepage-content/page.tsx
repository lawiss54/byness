import { Suspense } from 'react';
import { ContentService } from './services/contentService';
import HomepageContentManager from './components/HomepageContentManager';
import { Loader } from '@/components/shared';



export default async function AdminHomepageContentPage() {
  const initialContentSections = await ContentService.loadSections();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement du contenu..." />}>
      <HomepageContentManager initialSections={initialContentSections} />
    </Suspense>
  );
}