import { API_BASE_URL } from "../config";

export async function fetchShirts() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/shirts`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shirts: ${response.status}`);
  }

  return response.json();
}

export async function fetchShirtById(id) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/shirts/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch shirt: ${response.status}`);
  }

  return response.json();
}