import { cache } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// ✅ getSiteSettings (مع كاش)
export const getSiteSettings = cache(async () => {
  try {
    const res = await fetch(`${API_URL}/api/settings`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des paramètres');
    return await res.json();
  } catch (err) {
    console.error('Erreur metadata:', err);
    return null;
  }
});

// ✅ heroSection (مع كاش + transform نظيف)
export const heroSection = cache(async () => {
  try {
    const res = await fetch(`${API_URL}/api/contant`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des données de bannière');

    const response = await res.json();
    const slides = Array.isArray(response.data) ? response.data : [];

    const animationTypes = ['bounceIn', 'slideInLeft', 'fadeInUp'];
    const getRandomAnimation = () => animationTypes[Math.floor(Math.random() * animationTypes.length)];

    return slides
      .map((raw) => ({
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
      }))
      .filter((item) => item.status === true);
  } catch (err) {
    console.error('Erreur hero section:', err);
    return [];
  }
});

// ✅ products (مع كاش وتصفية hero_section)
export const getHeroProducts = cache(async () => {
  try {
    const res = await fetch(`${API_URL}/api/product`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des produits');

    const response = await res.json();
    const data = Array.isArray(response.data) ? response.data : [];
    return data.filter((item) => item.hero_section === true);
  } catch (err) {
    console.error('Erreur produits:', err);
    return [];
  }
});
