'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Home, Building2, MapPin } from 'lucide-react';

const QuickViewModal = ({ selectedProduct, setSelectedProduct }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'office'
  const [formData, setFormData] = useState({
    name: '',
    prenom: '',
    telephone: '',
    wilaya: '',
    daira: '',
    address: ''
  });

  const deliveryPrice = deliveryType === 'home' ? 0 : 300;
  const totalPrice = selectedProduct ? selectedProduct.price + deliveryPrice : 0;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log('Purchase data:', {
      product: selectedProduct,
      color: selectedColor,
      size: selectedSize,
      delivery: deliveryType,
      customer: formData,
      total: totalPrice
    });
  };

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-auto shadow-2xl"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {/* Close Button */}
            <motion.button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-brand-darkGreen-600 group-hover:text-brand-darkGreen-700" />
            </motion.button>

            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <motion.div 
                className="aspect-square relative overflow-hidden rounded-3xl shadow-xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              {/* Product Details */}
              <motion.div 
                className="space-y-6"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Product Info */}
                <div className="space-y-4">
                  <h2 className="text-4xl font-playfair font-bold text-brand-darkGreen-600 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-brand-darkGreen-500 text-lg leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Color Selection */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-darkGreen-600 text-lg">
                    Couleurs disponibles
                  </h4>
                  <div className="flex gap-3 flex-wrap">
                    {selectedProduct.colors?.map((color) => (
                      <motion.button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                          selectedColor === color
                            ? "border-brand-camel-500 bg-brand-camel-100 text-brand-camel-700 shadow-lg"
                            : "border-gray-300 hover:border-brand-camel-400 hover:bg-brand-camel-50"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-brand-darkGreen-600 text-lg">
                    Tailles disponibles
                  </h4>
                  <div className="flex gap-3 flex-wrap">
                    {selectedProduct.sizes?.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-xl border-2 transition-all duration-300 font-bold text-lg ${
                          selectedSize === size
                            ? "border-brand-camel-500 bg-brand-camel-100 text-brand-camel-700 shadow-lg"
                            : "border-gray-300 hover:border-brand-camel-400 hover:bg-brand-camel-50"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Order Form */}
                <motion.div 
                  className="bg-gradient-to-br from-brand-darkGreen-500 to-brand-darkGreen-700 p-6 rounded-2xl shadow-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Informations de commande
                  </h3>

                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white placeholder-white/70 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        placeholder="Entrez votre nom"
                        value={formData.prenom}
                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white placeholder-white/70 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white placeholder-white/70 transition-all duration-300"
                    />
                  </div>

                  {/* Delivery Type Switcher */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-sage-100 mb-3">
                     Mode de livraison
                    </label>
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
                      <motion.button
                        onClick={() => setDeliveryType('home')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                          deliveryType === 'home'
                            ? 'bg-brand-camel-500 text-white shadow-lg'
                            : 'text-white/80 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Home className="w-4 h-4" />
                        <span>Livraison à domicile </span>
                      </motion.button>
                      <motion.button
                        onClick={() => setDeliveryType('office')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                          deliveryType === 'office'
                            ? 'bg-brand-camel-500 text-white shadow-lg'
                            : 'text-white/80 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Retrait au bureau</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                        Wilaya
                      </label>
                      <select 
                        value={formData.wilaya}
                        onChange={(e) => handleInputChange('wilaya', e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white transition-all duration-300"
                      >
                        <option value="" className="text-gray-800"> Choisissez une wilaya </option>
                        <option value="21" className="text-gray-800">سكيكدة</option>
                        <option value="23" className="text-gray-800">عنابة</option>
                        <option value="16" className="text-gray-800">الجزائر</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                        Daira
                      </label>
                      <select 
                        value={formData.daira}
                        onChange={(e) => handleInputChange('daira', e.target.value)}
                        className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white transition-all duration-300"
                      >
                        <option value="" className="text-gray-800"> Choisissez une daïra </option>
                        <option value="ramdan" className="text-gray-800">رمضان جمال</option>
                        <option value="skikda" className="text-gray-800">سكيكدة</option>
                        <option value="hadiak" className="text-gray-800">الحدائق</option>
                      </select>
                    </div>
                  </div>

                  {/* Address Field - Only show for home delivery */}
                  <AnimatePresence>
                    {deliveryType === 'home' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <label className="block text-sm font-medium text-brand-sage-100 mb-2">
                          <MapPin className="w-4 h-4 inline-block mr-1" />
                          Adresse complète
                        </label>
                        <textarea
                          placeholder="Saisissez votre adresse complète ici..."
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full bg-white/20 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-brand-camel-400 focus:border-transparent text-white placeholder-white/70 transition-all duration-300 resize-none"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Price Summary */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-brand-camel-600 mb-4">
                      <ShoppingBag className="w-5 h-5" />
                      <span className="font-medium">
                        {deliveryType === 'home' ? 'Livraison express à domicile' : ' Retrait au bureau '}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600"> Prix du produit :</span>
                        <span className="font-bold text-brand-darkGreen-600">
                          {selectedProduct.price.toLocaleString()} DA
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {deliveryType === 'home' ? 'Frais de livraison :' : 'Réduction retrait :'}
                        </span>
                        <span className={`font-bold ${deliveryType === 'home' ? 'text-brand-camel-600' : 'text-green-600'}`}>
                          {deliveryType === 'home' ? '+' : '-'}{Math.abs(deliveryPrice - 0)} DA
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center text-xl">
                          <span className="font-bold text-brand-darkGreen-700">Total :</span>
                          <span className="font-bold text-brand-darkGreen-700">
                            {totalPrice.toLocaleString()} DA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Purchase Button */}
                <motion.button
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-brand-camel-500 to-brand-camel-600 hover:from-brand-camel-600 hover:to-brand-camel-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    <span>تأكيد الطلب الآن</span>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;