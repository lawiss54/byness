export interface Settings {
  // Define the shape of the settings object
  // This is an assumption based on the component names
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  yalidineApiKey: string;
}

export async function getSettings(): Promise<Settings | null> {
  try {
    const res = await fetch('/api/settings');
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
