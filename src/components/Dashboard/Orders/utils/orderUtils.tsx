import { Clock, CheckCircle, XCircle, Truck, Package, Undo2 } from 'lucide-react';
import { Badge } from '@/components/shared/ui';
import { TooltipElement } from '@/components/shared/ui/TooltipElement';

export function transformOrders(raw: any) {
  return {
    id: raw.order_number,
    customer_first_name: raw.customer_first_name,
    customer_last_name: raw.customer_last_name,
    customerPhone: raw.customer_phone,
    shippingType: raw.shipping_type,
    customerAddress: raw.shipping_address,
    municipality: raw.city,
    wilaya: raw.wilaya,
    status: raw.status,
    reason: raw.shipping_reason,
    total: raw.total,
    orderDate: raw.created_at,
    items: Array.isArray(raw.items) ? raw.items.map(item => ({
      id: item.product_id,
      name: item.product_name,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.product_img
    })) : [],
  };
}

export function calculateOrderStats(orders: any[]) {
  if (!orders) return {
    total: 0,
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    returned: 0,
    cancelled: 0,
    totalRevenue: 0
  };

  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    processing: orders.filter(o =>
      ['Pas encore expédié', 'A vérifier', 'En préparation'].includes(o.status)
    ).length,
    shipped: orders.filter(o =>
      ['Expédié', 'Sorti en livraison', 'Transfert', 'Vers Wilaya', 'Reçu à Wilaya'].includes(o.status)
    ).length,
    delivered: orders.filter(o => o.status === 'Livré').length,
    returned: orders.filter(o =>
      [
        'Retour vers centre',
        'Retourné au centre',
        'Retour transfert',
        'Retour groupé',
        'Retour à retirer',
        'Retour vers vendeur',
        'Retourné au vendeur', 'Echèc livraison', 'Echange échoué', 'Bloqué'
      ].includes(o.status)
    ).length,
    cancelled: orders.filter(o =>
      ['cancelled'].includes(o.status)
    ).length,
    totalRevenue: orders
      .filter(o =>
        ![
          'Echèc livraison',
          'Echange échoué',
          'Retour vers vendeur',
          'Retourné au vendeur',
          'Retour vers centre',
          'Retourné au centre',
          'Retour transfert',
          'Retour groupé',
          'Retour à retirer',
          'Bloqué'
        ].includes(o.status)
      )
      .reduce((sum, o) => sum + o.total, 0)
  };
}

export function getStatusIcon(status: string) {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-blue-500" />;
    case 'shipped':
      return <Truck className="w-4 h-4 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'retourné':
      return <Undo2 className="w-4 h-4 text-orange-600" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
}

export function getStatusBadge(status: string, reason?: string) {
  const message = reason?.trim() ? reason : 'Aucune raison pour le moment';
  const renderBadge = (label: string, variant: string) => (
    <TooltipElement tooltip={message} color={variant}>
      <Badge variant={variant}>{label}</Badge>
    </TooltipElement>
  );

  switch (status) {
    case 'pending':
      return renderBadge('En attente de confirmation', 'warning');
    case 'confirmed':
      return renderBadge('Commande confirmée', 'info');
    case 'Pas encore expédié':
      return renderBadge('Pas encore expédiée', 'processing');
    case 'A vérifier':
      return renderBadge('À vérifier', 'processing');
    case 'En préparation':
      return renderBadge('Commande en préparation', 'processing');
    case 'Pas encore ramassé':
      return renderBadge('En attente de ramassage', 'delivery');
    case 'Prêt à expédier':
      return renderBadge('Prête à expédier', 'delivery');
    case 'Ramassé':
      return renderBadge('Colis ramassé', 'delivery');
    case 'Bloqué':
      return renderBadge('Commande bloquée', 'blocked');
    case 'Débloqué':
      return renderBadge('Commande débloquée', 'info');
    case 'Transfert':
      return renderBadge('Transfert en cours', 'transit');
    case 'Expédié':
      return renderBadge('Commande expédiée', 'info');
    case 'Centre':
      return renderBadge('Au centre logistique', 'transit');
    case 'En localisation':
      return renderBadge('En cours de localisation', 'transit');
    case 'Vers Wilaya':
      return renderBadge('En route vers la Wilaya', 'transit');
    case 'Reçu à Wilaya':
      return renderBadge('Arrivée à la Wilaya', 'transit');
    case 'En attente du client':
      return renderBadge('En attente du client', 'warning');
    case 'Prêt pour livreur':
      return renderBadge('Prête pour livraison', 'delivery');
    case 'Sorti en livraison':
      return renderBadge('Sortie pour livraison', 'delivery');
    case 'En attente':
      return renderBadge('Commande en attente', 'warning');
    case 'En alerte':
      return renderBadge('Commande en alerte', 'attention');
    case 'Tentative échouée':
      return renderBadge('Tentative de livraison échouée', 'attention');
    case 'Livré':
      return renderBadge('Commande livrée avec succès', 'success');
    case 'Echèc livraison':
      return renderBadge('Échec de livraison', 'error');
    case 'Retour vers centre':
      return renderBadge('Retour vers le centre', 'returned');
    case 'Retourné au centre':
      return renderBadge('Retournée au centre', 'returned');
    case 'Retour transfert':
      return renderBadge('Retour en transfert', 'returned');
    case 'Retour groupé':
      return renderBadge('Retour groupé', 'returned');
    case 'Retour à retirer':
      return renderBadge('Retour à retirer', 'returned');
    case 'Retour vers vendeur':
      return renderBadge('Retour vers le vendeur', 'returned');
    case 'Retourné au vendeur':
      return renderBadge('Retournée au vendeur', 'returned');
    case 'Echange échoué':
      return renderBadge('Échange échoué', 'error');
    case 'cancelled':
      return renderBadge("La commande a été annulée", 'error');
    default:
      return renderBadge(status, 'default');
  }
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
