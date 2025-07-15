import { cache } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ getSiteSettings
export const getSiteSettings = cache(async () => {

  try {
    const res = await fetch(`${API_URL}/api/settings`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 500 }, // ⚙️ إعادة الجلب كل 60 ثانية
    });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.error('Metadata fetch error:', err);
    return null;
  }
});


// ✅ heroSection
export const heroSection = cache(async () => {
  const res = await fetch(`${API_URL}/api/contant-managers`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", // تم تصحيح "Contant-Type"
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch hero section');

  const data = await res.json();

  const animationTypes = ["bounceIn", "slideInLeft", "fadeInUp"];
  const getRandomAnimation = () =>
    animationTypes[Math.floor(Math.random() * animationTypes.length)];

  const transformSlides = (raw: any) => ({
    badge: raw.badge,
    mainTitle: raw.main_title,
    title: raw.title,
    description: raw.description,
    buttonText: raw.button_text,
    buttonLink: raw.button_link,
    image: raw.image,
    order: raw.order,
    status: raw.is_active,
    animationType: getRandomAnimation(),
  });

  return data.data
    .map(transformSlides)
    .filter((item: any) => item.status === true);
});


// ✅ products
export const products = cache(async () => {
  const res = await fetch(`${API_URL}/api/product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  const data = await res.json();
  return data.data.filter((item: any) => item.hero_section === true); // = بدل == كانت خطأ منطقي
});
