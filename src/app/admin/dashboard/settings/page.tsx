import { Suspense } from 'react';
import { getSettings } from './services';
import SettingsSection from './components/SettingsSection';
import { Loader } from '@/components/shared';

export const metadata = {
  title: 'Paramètres - Dashboard',
  description: 'Gérez les paramètres de votre boutique.',
};

export default async function AdminSettingsPage() {
  const initialSettings = await getSettings();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des paramètres..." />}>
      <SettingsSection initialSettings={initialSettings} />
    </Suspense>
  );
}
