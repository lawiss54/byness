'use client'

import { useEffect } from "react";
import { useApi } from "@/lib/apiContext";
import { Loader } from "../shared";

export default function RequestApi() {
    const { fetchResource, loading } = useApi();
    useEffect(() => {
        fetchResource()

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