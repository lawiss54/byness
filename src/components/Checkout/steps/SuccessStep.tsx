'use client';

import React, {useEffect} from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Truck, PhoneCall, Home } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import { useRouter } from 'next/navigation';

import { useFacebookPixelEvent } from '@/hooks/useFacebookPixelEvent'
import { useTiktokPixelEvent } from '@/hooks/useTiktokPixelEvent'
import { useCartCheckout } from '@/lib/CartCheckoutContext'

const SuccessStep: React.FC = () => {
  const router = useRouter();


  const { cartItems } = useCartCheckout()
  const { track } = useFacebookPixelEvent()
  const { trackTiktok } = useTiktokPixelEvent()

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const contents = cartItems.map((item) => ({
      content_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    track('CompletePayment', {
      value: total,
      currency: 'DZD',
      contents,
    })

    trackTiktok('CompletePayment', {
      value: total,
      currency: 'DZD',
      contents,
    })
  }, [])



  

  const nextSteps = [
    {
      icon: PhoneCall,
      title: 'Appel de confirmation',
      description: 'Vous recevrez un appel dans les 24h pour confirmer votre commande'
    },
    {
      icon: Package,
      title: 'Préparation',
      description: 'Votre commande sera préparée avec soin dans nos entrepôts'
    },
    {
      icon: Truck,
      title: 'Expédition',
      description: 'Livraison sous 2-4 jours ouvrables selon votre wilaya'
    }
  ];

  return (
    <motion.div
      className="text-center space-y-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Success Icon */}
      <motion.div
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Check className="w-12 h-12 text-green-600" />
      </motion.div>

      <div>
        <h2 className="text-4xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
          Commande confirmée !
        </h2>
        <p className="text-xl text-brand-darkGreen-400 max-w-2xl mx-auto">
          Merci pour votre commande. Vous recevrez bientôt un appel de confirmation 
          avec tous les détails de livraison.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-3xl p-8 max-w-2xl mx-auto">
        <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-6">
          Prochaines étapes
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {nextSteps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
            >
              <step.icon className="w-8 h-8 text-brand-camel-500 mx-auto mb-4" />
              <h4 className="font-semibold text-brand-darkGreen-500 mb-2">
                {step.title}
              </h4>
              <p className="text-sm text-brand-darkGreen-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => router.push('/boutique')}
          variant="outline"
          size="lg"
        >
          Continuer mes achats
        </Button>
        <Button
          onClick={() => router.push('/')}
          variant="primary"
          size="lg"
          icon={<Home className="w-5 h-5" />}
        >
          Retour à l'accueil
        </Button>
      </div>
    </motion.div>
  );
};

export default SuccessStep;