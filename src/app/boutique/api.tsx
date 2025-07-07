import { Product } from "@/components/Produit/ProductDetailsPage/type";


 
 
 
export const categories = [
    { name: "Robes", icon: "👗", count: 45, color: "#000000" },
    { name: "Blouses", icon: "👚", count: 32, color: "#000000" },
    { name: "Pantalons", icon: "👖", count: 28, color: "#000000" },
    { name: "Jupes", icon: "🩱", count: 19, color: "#000000" },
    { name: "Accessoires", icon: "👜", count: 15, color: "#000000" },
  ];

 
export const products = [
  {
    "id": "1",
    "slug": "robe-élégante-automne",
    "name": "Robe Élégante Automne",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 15092,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "Promo",
    "colors": ["#000000", "#C19A6B", "#9DC183"],
    "sizes": ["XS", "S", "M"],
    "category": "Pantalons",
    "stockQuantity": 86,
    "sku": "SKU-001",
    "status": "active",
    "features": ["Casual", "Cotton"],
    "isNew": false,
    "isSale": false,
    "discount": 0,
    "heroSection": true
  },
  {
    "id": "2",
    "slug": "manteau-classique-hiver",
    "name": "Manteau Classique Hiver",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 29906,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "Édition Limitée",
    "colors": ["#0000FF", "#808080"],
    "sizes": ["M", "L"],
    "category": "Robes",
    "stockQuantity": 29,
    "status": "active",
    "isNew": false,
    "isSale": false,
    "discount": 0,
    "heroSection": true
  },
  {
    "id": "3",
    "slug": "chemise-lin-été",
    "name": "Chemise Lin Été",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 22310,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "Best-seller",
    "colors": ["#FF0000", "#008000", "#F5F5DC"],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Vestes",
    "stockQuantity": 30,
    "sku": "SKU-003",
    "status": "active",
    "features": ["Stylish", "Comfortable"],
    "isNew": false,
    "isSale": false,
    "discount": 0,
    "heroSection": true
  },
  {
    "id": "4",
    "slug": "pantalon-chic",
    "name": "Pantalon Chic",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 15731,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "",
    "colors": ["#FFFFFF"],
    "sizes": ["One Size"],
    "category": "Jupes",
    "stockQuantity": 12,
    "sku": "SKU-004",
    "status": "active",
    "features": ["Stylish", "Comfortable"],
    "isNew": true,
    "isSale": false,
    "discount": 0,
    "heroSection": true
  },
  {
    "id": "5",
    "slug": "t-shirt-graphique",
    "name": "T-shirt Graphique",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 28228,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "Best-seller",
    "colors": ["#FFC0CB", "#964B00"],
    "sizes": ["S", "M", "L", "XL"],
    "category": "Robes",
    "stockQuantity": 77,
    "sku": "SKU-005",
    "status": "active",
    "features": ["Casual", "Cotton"],
    "isNew": false,
    "isSale": false,
    "discount": 0,
    "heroSection": false
  },
  // ...
  // أكمل بقية المنتجات بنفس النمط
  // إلى غاية ID: 20
  // ...
  {
    "id": "20",
    "slug": "haut-en-soie",
    "name": "Haut en Soie",
    "description": "Une pièce tendance de haute qualité parfaite pour toutes les occasions.",
    "price": 14729,
    "originalPrice": 0,
    "images": ["/robe.jpg", "/robe2.jpg", "/robe3.jpg"],
    "badge": "Best-seller",
    "colors": ["#FFC0CB", "#964B00"],
    "sizes": ["XS", "S", "M"],
    "category": "T-shirts",
    "stockQuantity": 33,
    "sku": "SKU-020",
    "status": "active",
    "features": ["Elegant", "Autumn Collection"],
    "isNew": false,
    "isSale": false,
    "discount": 0,
    "heroSection": true
  }
];




  export const heroProducts = (products: Product[]) => { 
    return products.filter(products => products?.heroSection === true);
  }

  export const similerProducts = ( categorie: string) => { 
    return products.filter(products => products?.category === categorie);
  }
  export const productFinder = ( slug: string) => { 
    return products.filter(products => products?.slug === slug);
  }


