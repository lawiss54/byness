import { toast } from 'react-toastify';
import { CartItem } from '@/app/panier/store/cart';
import { CheckoutFormData } from '../schemas/checkoutSchemas'; // Assuming the schema file is in this new location

interface OrderPayload {
  customer: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export const submitOrder = async (payload: OrderPayload): Promise<{ success: boolean; error?: string }> => {
  try {
    const order = {
      id: `CMD-${Date.now()}`,
      customer: payload.customer,
      items: payload.items,
      subtotal: payload.subtotal,
      shippingPrice: payload.customer.shippingPrice,
      total: payload.total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(order)
    });

    const responseData = await res.json();

    if (!res.ok) {
      toast.error(responseData.error || 'Failed to create order');
      return { success: false, error: responseData.error || 'Failed to create order' };
    }

    if (responseData.error) {
      toast.error(responseData.error);
      return { success: false, error: responseData.error };
    }

    toast.success('Order created successfully!');
    return { success: true };

  } catch (error) {
    console.error('Order submission failed:', error);
    toast.error('An unexpected error occurred during order submission.');
    return { success: false, error: 'An unexpected error occurred.' };
  }
};
