import { ordersService } from './ordersService';

export const orderEditService = {
  async updateOrder(updatedOrder: any) {
    return await ordersService.updateOrder(updatedOrder);
  },

  async validateOrderData(orderData: any) {
    // Add any specific validation logic for order editing
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Au moins un produit doit être ajouté');
    }

    if (orderData.shippingType === 'desk' && !orderData.deskId) {
      throw new Error('Veuillez sélectionner un bureau de retrait');
    }

    if (orderData.needsExchange && !orderData.product_to_collect?.trim()) {
      throw new Error('Veuillez saisir le produit à échanger');
    }

    return true;
  },

  async prepareOrderForSubmission(formData: any, order: any, shippingPrice: number) {
    const subtotal = formData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + (formData.isFreeShipping ? 0 : shippingPrice);

    return {
      ...order,
      ...formData,
      total,
      shipping_price: shippingPrice,
      subtotal
    };
  }
};
