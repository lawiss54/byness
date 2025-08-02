'use client';;
import { motion } from 'framer-motion';
import { X, Edit, Phone, User, Package } from 'lucide-react';
import { Button, Badge } from '@/components/shared/ui';
import Image from 'next/image';

interface OrderDetailsProps {
  order: any;
  onEdit: () => void;
  onClose: () => void;
}

export default function OrderDetails({ order, onEdit, onClose }: OrderDetailsProps) {

  console.log(order)
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">En attente de confirmation</Badge>;

      case 'confirmed':
        return <Badge variant="info">Commande confirmée</Badge>;

      case 'Pas encore expédié':
        return <Badge variant="processing">Pas encore expédiée</Badge>;

      case 'A vérifier':
        return <Badge variant="processing">À vérifier</Badge>;

      case 'En préparation':
        return <Badge variant="processing">Commande en préparation</Badge>;

      case 'Pas encore ramassé':
        return <Badge variant="delivery">En attente de ramassage</Badge>;

      case 'Prêt à expédier':
        return <Badge variant="delivery">Prête à expédier</Badge>;

      case 'Ramassé':
        return <Badge variant="delivery">Colis ramassé</Badge>;

      case 'Bloqué':
        return <Badge variant="blocked">Commande bloquée</Badge>;

      case 'Débloqué':
        return <Badge variant="info">Commande débloquée</Badge>;

      case 'Transfert':
        return <Badge variant="transit">Transfert en cours</Badge>;

      case 'Expédié':
        return <Badge variant="info">Commande expédiée</Badge>;

      case 'Centre':
        return <Badge variant="transit">Au centre logistique</Badge>;

      case 'En localisation':
        return <Badge variant="transit">En cours de localisation</Badge>;

      case 'Vers Wilaya':
        return <Badge variant="transit">En route vers la Wilaya</Badge>;

      case 'Reçu à Wilaya':
        return <Badge variant="transit">Arrivée à la Wilaya</Badge>;

      case 'En attente du client':
        return <Badge variant="warning">En attente du client</Badge>;

      case 'Prêt pour livreur':
        return <Badge variant="delivery">Prête pour livraison</Badge>;

      case 'Sorti en livraison':
        return <Badge variant="delivery">Sortie pour livraison</Badge>;

      case 'En attente':
        return <Badge variant="warning">Commande en attente</Badge>;

      case 'En alerte':
        return <Badge variant="attention">Commande en alerte</Badge>;

      case 'Tentative échouée':
        return <Badge variant="attention">Tentative de livraison échouée</Badge>;

      case 'Livré':
        return <Badge variant="success">Commande livrée avec succès</Badge>;

      case 'Echèc livraison':
        return <Badge variant="error">Échec de livraison</Badge>;

      case 'Retour vers centre':
        return <Badge variant="returned">Retour vers le centre</Badge>;

      case 'Retourné au centre':
        return <Badge variant="returned">Retournée au centre</Badge>;

      case 'Retour transfert':
        return <Badge variant="returned">Retour en transfert</Badge>;

      case 'Retour groupé':
        return <Badge variant="returned">Retour groupé</Badge>;

      case 'Retour à retirer':
        return <Badge variant="returned">Retour à retirer</Badge>;

      case 'Retour vers vendeur':
        return <Badge variant="returned">Retour vers le vendeur</Badge>;

      case 'Retourné au vendeur':
        return <Badge variant="returned">Retournée au vendeur</Badge>;

      case 'Echange échoué':
        return <Badge variant="error">Échange échoué</Badge>;

      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

 

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-brand-camel-50 to-brand-sage-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Détails de la commande</h2>
            <p className="text-gray-600">{order.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
              onClick={onEdit}
            >
              Modifier
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<X className="w-5 h-5" />}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Information */}
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Informations de la commande
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Numéro de commande :</span>
                    <span className="font-semibold text-gray-900">{order?.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Statut :</span>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date de commande :</span>
                    <span className="text-gray-900">{formatDate(order.orderDate)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type de livraison :</span>
                    <span className="text-gray-900">
                      {order.shippingType === 'home' ? 'Livraison à domicile' : 'Retrait au bureau'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informations du client
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nom :</span>
                    <span className="font-semibold text-gray-900">{[order.customer_first_name, order.customer_last_name].filter(Boolean).join(' ')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Téléphone :</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{order.customerPhone}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Phone className="w-4 h-4" />}
                        onClick={() => window.open(`tel:${order.customerPhone}`)}
                        className="text-green-600 hover:text-green-700"
                      />
                    </div>
                  </div>
                  {order.shippingType !== 'home' && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">Adresse :</span>
                      <div className="text-right">
                        <p className="text-gray-900">{order.customerAddress}</p>
                        <p className="text-sm text-gray-600">{order.municipality}, {order.wilaya}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Produits commandés
                </h3>
                
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.images}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Quantité : {item.quantity}</p>
                          <p>Couleur : {item.color}</p>
                          <p>Taille : {item.size}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString()} DA
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.price.toLocaleString()} DA × {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Sous-total :</span>
                      <span>{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Livraison :</span>
                      <span>{order.shippingType === 'home' ? '800' : '300'} DA</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                      <span>Total général :</span>
                      <span>{order.total.toLocaleString()} DA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-brand-camel-50 to-brand-sage-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    icon={<Phone className="w-4 h-4" />}
                    onClick={() => window.open(`tel:${order.customerPhone}`)}
                    fullWidth
                  >
                    Appeler
                  </Button>
                  
                  <Button
                    variant="outline"
                    icon={<Edit className="w-4 h-4" />}
                    onClick={onEdit}
                    fullWidth
                  >
                    Modifier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}