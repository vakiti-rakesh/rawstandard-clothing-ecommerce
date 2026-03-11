import { API_BASE_URL } from "../config";

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }
  return response.json();
}

export async function fetchShirts() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/shirts`);
  return handleResponse(response, "Failed to fetch shirts");
}

export async function fetchShirtById(id) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/shirts/${id}`);
  return handleResponse(response, "Failed to fetch shirt");
}

export async function fetchShirtSizes(id) {
  const shirt = await fetchShirtById(id);
  return shirt.sizes || [];
}

export async function checkout(payload) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  const response = await fetch(`${API_BASE_URL}/api/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Checkout failed");
}