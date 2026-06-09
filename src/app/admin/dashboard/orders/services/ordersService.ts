import { transformOrders } from '../utils/orderUtils';

const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

export const ordersService = {
  
  async fetchOrders() {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await res.json();
    
    
    return data.data.map(transformOrders);
  },

  async changeOrderStatus(orderIds: string[], newStatus: string) {
    const data = {
      orders: orderIds,
      status: newStatus
    };

    const res = await fetch(`${API_BASE_URL}/api/orders/change-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to change order status');
    }

    return await res.json();
  },

  async downloadOrdersPDF(orderIds: string[]) {
    const data = { orders: orderIds };
    const res = await fetch(`${API_BASE_URL}/api/orders/Bordereaus`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to download PDF');
    }
    console.log(res)

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-links.xlsx';
    a.click();
    a.remove();
  },

  async updateOrder(updatedOrder: any) {
    const res = await fetch(`${API_BASE_URL}/api/orders/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!res.ok) {
      throw new Error('Failed to update order');
    }

    return await res.json();
  }
};
