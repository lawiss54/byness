"use client"
import { Product } from "@/components/Produit/ProductDetailsPage/type";
import { useApi } from "@/lib/apiContext";



 
 const {setLoading} = useApi()
 
export const categories = [
    { name: "Robes", icon: "👗", count: 45, color: "#000000" },
    { name: "Blouses", icon: "👚", count: 32, color: "#000000" },
    { name: "Pantalons", icon: "👖", count: 28, color: "#000000" },
    { name: "Jupes", icon: "🩱", count: 19, color: "#000000" },
    { name: "Accessoires", icon: "👜", count: 15, color: "#000000" },
  ];

 


export const productFinder = ( slug: string) => { 
    
    return products.filter(products => products?.slug === slug);
    
  }




  export const heroProducts = () => { 
    return products.filter(products => products?.hero_section === true);
  }
  
  


