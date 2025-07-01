
/**
 * SEO utilities for better search engine optimization
 */

/**
 * Generate structured data for products
 * Helps search engines understand the content better
 */
export const generateProductStructuredData = (products: SimilarProduct[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Produits Similaires",
    "description": "Découvrez notre sélection de produits similaires",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "image": product.image,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "DZD",
        "availability": product.isInStock ? "InStock" : "OutOfStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviews
      }
    }))
  };
};

/**
 * Generate meta tags for the section
 */
export const generateMetaTags = (products: SimilarProduct[]) => {
  const productNames = products.slice(0, 3).map(p => p.name).join(', ');
  
  return {
    title: `Produits Similaires - ${productNames} et plus`,
    description: `Découvrez ${products.length} produits similaires sélectionnés pour vous. ${productNames} avec les meilleurs prix.`,
    keywords: products.flatMap(p => p.tags || []).join(', '),
  };
};