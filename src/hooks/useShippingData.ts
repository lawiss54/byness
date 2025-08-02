"use client";
import { useEffect, useState } from 'react';

export function useShippingData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('/api/shipping-data') // هذا الاتصال يرجع wilayas مع communes و shipping info
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
