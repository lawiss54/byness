import { getCache, setCache } from '@/lib/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const ttlSeconds = 300 ;

// ✅ getSiteSettings call
export const getSiteSettings = async () => {
  const cacheKey = 'settings:data'
  const cached = getCache(cacheKey);
  if(cached){
    return cached;
  }
  try {
    const res = await fetch(`${API_URL}/api/settings`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des paramètres');
    const data = await res.json();
    setCache(cacheKey, data, ttlSeconds)
    return data;
  } catch (err) {
    console.error('Erreur metadata:', err);
    return null;
  }
};
// ✅ heroSection (مع كاش داخلي)
export const heroSection = async () => {
  const cacheKey = 'heroSection:data';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch(`${API_URL}/api/contant`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des données de bannière');

    const response = await res.json();
    const slides = Array.isArray(response.data) ? response.data : [];

    const animationTypes = ['bounceIn', 'slideInLeft', 'fadeInUp'];
    const getRandomAnimation = () =>
      animationTypes[Math.floor(Math.random() * animationTypes.length)];

    const formattedSlides = slides
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

    // تخزين في الكاش
    setCache(cacheKey, formattedSlides, ttlSeconds);

    return formattedSlides;
  } catch (err) {
    console.error('Erreur hero section:', err);
    return [];
  }
};

// ✅ getHeroProducts (مع كاش داخلي)
export const getHeroProducts = async () => {
  const cacheKey = 'heroProducts:data';
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const res = await fetch(`${API_URL}/api/product`, { method: 'GET', headers });
    if (!res.ok) throw new Error('Échec de récupération des produits');

    const response = await res.json();
    const data = Array.isArray(response.data) ? response.data : [];

    const filteredProducts = data.filter((item) => item.hero_section === true);

    // تخزين في الكاش
    setCache(cacheKey, filteredProducts, ttlSeconds);

    return filteredProducts;
  } catch (err) {
    console.error('Erreur produits:', err);
    return [];
  }
};