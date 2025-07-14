import NouvelleCollectionSection from '@/components/Home/NouvelleCollectionSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HeroSection from '@/components/Home/HeroSection';

import { heroSection, products } from '@/lib/api'




export default async function Home() {

 

  
  const getSlide = await heroSection();
  

  const sortedSlides = getSlide.sort((a, b) => a.order - b.order);

  const getPoducts = await products()

  

  


  return (
    <>

      <HeroSection slides={sortedSlides} />
      <FeaturesSection />
       <NouvelleCollectionSection products={getPoducts} /> 

    </>
  );
}
