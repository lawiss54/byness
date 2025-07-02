import NouvelleCollectionSection from '@/components/Home/NouvelleCollectionSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HeroSection from '@/components/Home/HeroSection';
import { products, heroProducts } from './boutique/api';


export default function Home() {

    const slides = [
        {
          id: 1,
          image: "/robe.jpg",
          title: "Collection Été 2025",
          subtitle: "Découvrez notre nouvelle collection estivale avec des pièces uniques et tendances pour un style raffiné.",
          category: "Nouvelle Collection",
          ctaText: "Découvrir",
          animationType: "fadeInUp"
        },
        {
          id: 2,
          image: "/robe2.jpg",
          title: "Mode Urbaine",
          subtitle: "Style contemporain et confort optimal pour vos journées en ville avec notre gamme urbaine exclusive.",
          category: "Tendance Urbaine",
          ctaText: "Explorer",
          animationType: "slideInLeft"
        },
        {
          id: 3,
          image: "/robe3.jpg",
          title: "Élégance Intemporelle",
          subtitle: "Des créations sophistiquées qui transcendent les saisons pour un look élégant en toute occasion.",
          category: "Collection Premium",
          ctaText: "Voir Plus",
          animationType: "bounceIn"
        },
       
    ];
    const getProduct = heroProducts(products)

  


  return (
    <>
    
      <HeroSection slides={slides} />
      <FeaturesSection />
      <NouvelleCollectionSection products={getProduct} /> 
      
    </>
  );
}
