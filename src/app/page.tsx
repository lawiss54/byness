import NouvelleCollectionSection from '@/components/Home/NouvelleCollectionSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HeroSection from '@/components/Home/HeroSection';
import { products, heroProducts } from './boutique/api';
import dynamic from 'next/dynamic';



export default function Home() {


    const slides = [
        {
          id: 1,
          image: "/hero.jpg",
          title: "Collection Été 2025",
          subtitle: "",
          category: "Nouvelle Collection",
          ctaText: "Découvrir",
          animationType: "fadeInUp",
          className: "left-0 -translate-x-[4rem]"
        },
        {
          id: 2,
          image: "/robe2.jpg",
          title: "Mode Urbaine",
          subtitle: "Style contemporain et confort optimal pour vos journées en ville avec notre gamme urbaine exclusive.",
          category: "Tendance Urbaine",
          ctaText: "Explorer",
          animationType: "slideInLeft",
          className: ""
        },
        {
          id: 3,
          image: "/robe3.jpg",
          title: "Élégance Intemporelle",
          subtitle: "Des créations sophistiquées qui transcendent les saisons pour un look élégant en toute occasion.",
          category: "Collection Premium",
          ctaText: "Voir Plus",
          animationType: "bounceIn",
          className: ""
        },
       
    ];
    const getProduct = heroProducts(products)
    const nouvelleCollectionProducts = getProduct.slice(0, 4);

    

  


  return (
    <>
    
      <HeroSection slides={slides} />
      <FeaturesSection />
      <NouvelleCollectionSection products={nouvelleCollectionProducts} /> 
      
    </>
  );
}
