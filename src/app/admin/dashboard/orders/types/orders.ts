export type OrderStatus =
  | 'all'
  | 'pending'
  | 'confirmed'
  | 'Pas encore expédié'
  | 'A vérifier'
  | 'En préparation'
  | 'Pas encore ramassé'
  | 'Prêt à expédier'
  | 'Ramassé'
  | 'Bloqué'
  | 'Débloqué'
  | 'Transfert'
  | 'Expédié'
  | 'Centre'
  | 'En localisation'
  | 'Vers Wilaya'
  | 'Reçu à Wilaya'
  | 'En attente du client'
  | 'Prêt pour livreur'
  | 'Sorti en livraison'
  | 'En attente'
  | 'En alerte'
  | 'Tentative échouée'
  | 'Livré'
  | 'Echèc livraison'
  | 'Retour vers centre'
  | 'Retourné au centre'
  | 'Retour transfert'
  | 'Retour groupé'
  | 'Retour à retirer'
  | 'Retour vers vendeur'
  | 'Retourné au vendeur'
  | 'Echange échoué'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed_delivery'
  | 'returned'
  | 'cancelled';

export type ViewMode = 'grid' | 'table';

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  image: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  shippingType: string;
  deskId?: string;
  customerAddress: string;
  municipality: string;
  wilaya: string;
  status: string;
  reason?: string | null;
  total: number;
  orderDate: string;
  items: OrderItem[];
  trackingNumber?: string;
};
