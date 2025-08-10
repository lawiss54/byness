import { HomepageContent } from '../types';

const transformContent = (raw: any): HomepageContent => {
  const animationTypes = ["bounceIn", "slideInLeft", "fadeInUp"];
  const getRandomAnimation = () => animationTypes[Math.floor(Math.random() * animationTypes.length)];

  return {
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
  };
};

export async function getHomepageContent(): Promise<HomepageContent[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL || ''}/api/contant`, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error('Failed to fetch homepage content');
    }

    const { data } = await res.json();
    if (!data) {
      return [];
    }

    const transformed = data
      .map(transformContent)
      .filter((item: HomepageContent) => item.status === true);

    return transformed;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return [];
  }
}
