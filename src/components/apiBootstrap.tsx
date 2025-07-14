'use client'

import { useEffect } from "react";
import { useApi } from "@/lib/apiContext";
import { Loader } from "./shared";

export default function ApiBootstrap() {
    const { fatchRessorce, loading } = useApi();
    useEffect(() => {
        fatchRessorce()

    }, []);

    if (loading) {
        return <Loader
            type="fashion"
            size="lg"
            text="Chargement..."
        />
    }

    return null;

}