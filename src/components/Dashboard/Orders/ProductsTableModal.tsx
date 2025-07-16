import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, X } from 'lucide-react';
import Image from 'next/image';

const Button = ({ variant = 'primary', onClick, icon, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-secondary font-medium transition-all duration-200";
  const variants = {
    primary: "bg-brand-darkGreen-500 text-brand-ivory-50 hover:bg-brand-darkGreen-600 shadow-lg hover:shadow-xl",
    secondary: "bg-brand-sage-200 text-brand-darkGreen-700 hover:bg-brand-sage-300",
    success: "bg-brand-camel-500 text-brand-ivory-50 hover:bg-brand-camel-600 shadow-lg hover:shadow-xl"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

const productsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    name: "Chaussure de sport classique",
    price: "299",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Noir", "Blanc", "Bleu"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
    name: "Chaussure formelle en cuir",
    price: "450",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Marron", "Noir"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop",
    name: "Chaussure de course",
    price: "380",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Rouge", "Noir", "Gris"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=100&h=100&fit=crop",
    name: "Chaussure décontractée",
    price: "320",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Blanc", "Beige", "Bleu clair"]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop",
    name: "Chaussure de sport haute",
    price: "420",
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["Noir", "Blanc", "Rouge"]
  }
];

interface Props {
  productsData: Array; 
  onClose: () => void;
  append: any;
}

export default function ProductsTableModal({ onClose, productsData, append }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddProduct = (product) => {
    // Ici on peut ajouter le produit au panier
    
    append({
      id: product.id.toLocaleString(),
      name: product.name,
      quantity: 1,
      price: product.price,
      color: product.colors[0],
      size: product.sizes[0],
      image: product.images[0],
    });
    onClose()
  };
  

  return (
    <motion.div
      className="fixed inset-0 bg-brand-darkGreen-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-brand-ivory-50 rounded-3xl shadow-2xl w-full max-h-full overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-darkGreen-500 to-brand-darkGreen-600 text-brand-ivory-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-primary font-semibold">Tableau des produits</h2>
            <button 
              onClick={onClose}
              className="text-brand-ivory-50 hover:bg-brand-ivory-50/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-darkGreen-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-brand-ivory-50/90 text-brand-darkGreen-800 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-sage-300 placeholder-brand-darkGreen-400 font-secondary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-96">
          <table className="w-full">
            <thead className="bg-brand-sage-100 sticky top-0">
              <tr>
                <th className="text-left p-4 font-primary font-semibold text-brand-darkGreen-700">Image</th>
                <th className="text-left p-4 font-primary font-semibold text-brand-darkGreen-700">Nom du produit</th>
                <th className="text-left p-4 font-primary font-semibold text-brand-darkGreen-700">Prix</th>
                <th className="text-left p-4 font-primary font-semibold text-brand-darkGreen-700">Tailles</th>
                <th className="text-left p-4 font-primary font-semibold text-brand-darkGreen-700">Couleurs</th>
                <th className="text-center p-4 font-primary font-semibold text-brand-darkGreen-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  className="border-b border-brand-sage-200 hover:bg-brand-sage-50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-4">
                    <Image
                      width={50}
                      height={50}
                      filteredProducts
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="p-4">
                    <span className="font-secondary font-medium text-brand-darkGreen-800">{product.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-brand-camel-600 font-secondary font-semibold text-lg">{product.price} DA</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <span 
                          key={size}
                          className="bg-brand-darkGreen-100 text-brand-darkGreen-700 text-xs px-2 py-1 rounded-full font-secondary"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.colors.map((color) => (
                        <span 
                          key={color}
                          className="bg-brand-sage-200 text-brand-darkGreen-700 text-xs px-2 py-1 rounded-full font-secondary"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      variant="success"
                      onClick={() => handleAddProduct(product)}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      Ajouter
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-brand-sage-100 p-6 text-center">
          <p className="text-brand-darkGreen-700 font-secondary">
            Nombre de produits affichés: {filteredProducts.length} sur {productsData.length}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}