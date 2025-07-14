

export async function getSiteSettings() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    try {
        const res = await fetch(`${API_URL}/api/settings`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (!res.ok) throw new Error('Failed to fetch settings');
        return await res.json();
    } catch (err) {
        console.error('Metadata fetch error:', err);
        return null;
    }
}

export async function heroSection() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/contant-managers`, {
            method: 'GET',
            headers: {
                "Contant-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (!res.ok) throw new Error('Failde to fetch settings');
        const data = await res.json();
        const animationTypes = ["bounceIn", "slideInLeft", "fadeInUp"];


        function getRandomAnimation() {
            const randomIndex = Math.floor(Math.random() * animationTypes.length);
            return animationTypes[randomIndex];
        }

        function transformSlides(raw) {
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
                animationType: getRandomAnimation()
            };
        }
        return data.data.map(item => transformSlides(item))
            .filter(item => item.status === true);
    
}

export const products = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res  = await fetch(`${API_URL}/api/product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data.data.filter(item => item.hero_section = true))
  return data.data.filter(item => item.hero_section = true)
}
