'use client'
import LoginPage from "@/components/auth/LoginPage";
import { FullScreenLoader, Loader } from "@/components/shared";
import { useSimulatedLoader } from "@/hooks/useLoader";
import { request } from "http";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default function adminPage() {

  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true);
 

 useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/Auth/refresh-token');
        if (res.ok) {
          router.replace('/admin/dashboard');
        } else {
          setIsChecking(false); // السماح بعرض الفورم
        }
      } catch (err) {
        console.error('Erreur de vérification:', err);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  

   if (isChecking) {
    return <Loader
        type="fashion"
        size="lg"
        text="Chargement..."
      />
  
  }

  return(
    <LoginPage />
  )
}
  
