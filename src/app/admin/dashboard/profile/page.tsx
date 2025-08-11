
import ProfileSettings from "./components/ProfileSettings";
import { Suspense } from 'react';
import { Loader } from '@/components/shared';
// This is a Server Component by default (no "use client")
export default async function ProfilePage() {
  // If you need server data, you can fetch it here and pass as props
  // Example:
  // const userData = await getUserFromSession();

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des commandes..." />}>
      <ProfileSettings /* user={userData} */ />
    </Suspense>
  );
}