
export interface ProductItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  total: number;
  status: string;
  deliveryToOffice: boolean;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: ProductItem[];
}

export const orderStatuses = {
  pending_confirmation: { 
    label: 'في انتظار التأكيد', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    bgColor: 'bg-yellow-50',
  },
  confirmed: { 
    label: 'مؤكد', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    bgColor: 'bg-blue-50',
  },
  preparing: { 
    label: 'طور التحضير', 
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    bgColor: 'bg-orange-50',
  },
  shipped: { 
    label: 'في الشحن', 
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    bgColor: 'bg-purple-50',
  },
  delivered: { 
    label: 'تم التسليم', 
    color: 'bg-green-100 text-green-800 border-green-200',
    bgColor: 'bg-green-50',
  },
  returned: { 
    label: 'مرجع', 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    bgColor: 'bg-gray-50',
  },
  cancelled: { 
    label: 'ملغى', 
    color: 'bg-red-100 text-red-800 border-red-200',
    bgColor: 'bg-red-50',
  }
};
