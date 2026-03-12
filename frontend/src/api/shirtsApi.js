import { API_BASE_URL } from "../config";

async function handleResponse(response, errorMessage) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `${errorMessage}: ${response.status}`);
  }

  return data;
}

export async function fetchShirts() {
  const response = await fetch(`${API_BASE_URL}/api/shirts`);
  return handleResponse(response, "Failed to fetch shirts");
}

export async function fetchShirtById(id) {
  const response = await fetch(`${API_BASE_URL}/api/shirts/${id}`);
  return handleResponse(response, "Failed to fetch shirt");
}

export async function fetchShirtSizes(id) {
  const shirt = await fetchShirtById(id);
  return shirt.sizes || [];
}

export async function checkout(payload) {
  const response = await fetch(`${API_BASE_URL}/api/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Checkout failed");
}