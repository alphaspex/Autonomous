/**
 * Pure Network I/O Module
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchSampleSketch() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/sketch/sample`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch sketch:", error);
    return null;
  }
}
