import { Suspense } from 'react';
import { ordersService } from './services/ordersService';
import OrdersSection from './components/OrdersSection';
import { Loader } from '@/components/shared';



export default async function AdminOrdersPage() {
  // Fetch initial orders on the server.
  const initialOrders = await ordersService.fetchOrders();
  

  return (
    <Suspense fallback={<Loader type="spinner" size="lg" text="Chargement des commandes..." />}>
      <OrdersSection initialOrders={initialOrders} />
    </Suspense>
  );
}
