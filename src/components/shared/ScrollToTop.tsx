'use client'
import {usePathname} from "next/Navigation";
import {useEffect} from 'react';

export default function ScrollToTop(){
    const pathname = usePathname();
    useEffect(() => {  
      if (typeof window === 'undefined') return;
      window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pathname]);

    return null
    
}