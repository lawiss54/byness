"use client";

import { useEffect, useState } from "react";

export function useShippingData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/shipping-data", {
      cache: "no-store", // منع الكاش نهائيًا
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des données");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Erreur API:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}