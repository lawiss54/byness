import ProductDetailsPage from '@/components/Produit/ProductDetailsPage';

// Mock data - في التطبيق الحقيقي، ستأتي هذه البيانات من API
const mockProduct = {
  id: '1',
  name: 'Robe Élégante Automne',
  description: 'Une robe sophistiquée parfaite pour les occasions spéciales, confectionnée dans des matériaux de qualité supérieure. Cette pièce unique allie élégance moderne et confort exceptionnel.',
  longDescription: 'Cette robe exceptionnelle représente le summum de l\'élégance moderne. Confectionnée avec soin dans nos ateliers, elle utilise des tissus de la plus haute qualité pour vous offrir un confort inégalé tout au long de la journée. Sa coupe flatteuse s\'adapte parfaitement à votre silhouette, tandis que ses détails raffinés en font une pièce véritablement unique. Parfaite pour les occasions spéciales, cette robe deviendra rapidement un incontournable de votre garde-robe.',
  price: 15900,
  originalPrice: 19900,
  images: [
    'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  badge: 'Nouveau',
  rating: 4.8,
  reviews: 124,
  colors: ['Noir', 'Camel', 'Sage', 'Bordeaux'],
  sizes: ['S', 'M', 'L', 'XL'],
  category: 'Robes',
  material: '95% Viscose, 5% Élasthanne',
  care: 'Lavage à la main, séchage à plat',
  features: [
    'Coupe flatteuse et confortable',
    'Tissu premium respirant',
    'Finitions soignées',
    'Taille élastique',
    'Doublure de qualité'
  ],
  inStock: true,
  stockQuantity: 15
};

const similarProducts = [
  {
    id: '2',
    name: 'Blazer Signature',
    description: 'Description for Blazer Signature',
    longDescription: 'Long description for Blazer Signature',
    price: 22500,
    originalPrice: 28000,
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'],
    badge: 'New',
    rating: 4.9,
    reviews: 89,
    colors: ['Black'],
    sizes: ['M'],
    category: 'Blazers',
    material: 'Cotton',
    care: 'Dry Clean',
    features: ['Feature 1'],
    inStock: true,
    stockQuantity: 10
  },
  {
    id: '3',
    name: 'Robe Cocktail',
    description: 'Description for Robe Cocktail',
    longDescription: 'Long description for Robe Cocktail',
    price: 18900,
    images: ['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
    badge: 'Sale',
    rating: 4.7,
    reviews: 156,
    colors: ['Red'],
    sizes: ['S'],
    category: 'Dresses',
    material: 'Silk',
    care: 'Hand Wash',
    features: ['Feature 2'],
    inStock: true,
    stockQuantity: 5
  },
  {
    id: '4',
    name: 'Ensemble Élégant',
    description: 'Description for Ensemble Élégant',
    longDescription: 'Long description for Ensemble Élégant',
    price: 32900,
    originalPrice: 39900,
    images: ['https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800'],
    badge: 'Popular',
    rating: 4.8,
    reviews: 203,
    colors: ['Blue'],
    sizes: ['L'],
    category: 'Sets',
    material: 'Polyester',
    care: 'Machine Wash',
    features: ['Feature 3'],
    inStock: true,
    stockQuantity: 12
  }
];

const exclusiveProducts = [
  {
    id: '5',
    name: 'Collection Prestige - Robe de Soirée',
    description: 'Description for Collection Prestige - Robe de Soirée',
    longDescription: 'Long description for Collection Prestige - Robe de Soirée',
    price: 45900,
    images: ['https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800'],
    badge: 'Édition Limitée',
    rating: 5.0,
    reviews: 45,
    colors: ['Gold'],
    sizes: ['M'],
    category: 'Dresses',
    material: 'Satin',
    care: 'Dry Clean',
    features: ['Feature 4'],
    inStock: true,
    stockQuantity: 3
  },
  {
    id: '6',
    name: 'Tailleur Couture Premium',
    description: 'Description for Tailleur Couture Premium',
    longDescription: 'Long description for Tailleur Couture Premium',
    price: 52900,
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'],
    badge: 'Exclusif',
    rating: 4.9,
    reviews: 78,
    colors: ['Silver'],
    sizes: ['L'],
    category: 'Suits',
    material: 'Wool',
    care: 'Dry Clean',
    features: ['Feature 5'],
    inStock: true,
    stockQuantity: 7
  }
];

export default function ProductPage() {
  return (
    <ProductDetailsPage 
      product={mockProduct}
      similarProducts={similarProducts}
      exclusiveProducts={exclusiveProducts}
    />
  );
}