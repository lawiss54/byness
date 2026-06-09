'use client';
import { useEffect, useState } from "react";
import { Loader } from "@/components/shared";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'




const LoginPage = dynamic(
    () => import('@/components/auth/LoginPage'),
    { ssr: false }
)


export default function AdminPage() {

    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true);


    useEffect(() => {

        const checkAuth = async () => {
            if (typeof window === undefined) return;
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
        if (typeof window === undefined) return;
        return <Loader
            type="fashion"
            size="lg"
            text="Chargement..."
        />

    }

    return (
        <LoginPage />
    )
}

