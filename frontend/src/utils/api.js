const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchSampleSketch() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/sketch/sample`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch sample sketch:", error);
    return null;
  }
}

export async function generateSketch(rawText) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/sketch/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ raw_text: rawText })
    });
    
    if (!response.ok) {
      console.error("Parse error:", await response.text());
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to generate sketch:", error);
    return null;
  }
}
