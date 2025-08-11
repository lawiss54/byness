export interface Settings {
  // Define the shape of the settings object
  // This is an assumption based on the component names
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  yalidineApiKey: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

export async function getSettings(): Promise<Settings | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/settings`);
    if (!res.ok) {
      throw new Error('Failed to fetch settings');
    }
    const data = await res.json();
    return data.data; // Assuming the data is nested under a 'data' key
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}
