// src/api/shirtsApi.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchShirts() {
  const res = await fetch(`${BASE_URL}/shirts`);
  if (!res.ok) throw new Error(`Failed to fetch shirts: ${res.status}`);
  return res.json();
}

export async function fetchShirtById(id) {
  const res = await fetch(`${BASE_URL}/shirts/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch shirt ${id}: ${res.status}`);
  return res.json();
}

// Optional: only works if backend endpoint exists
export async function fetchShirtSizes(id) {
  const res = await fetch(`${BASE_URL}/shirts/${id}/sizes`);
  if (!res.ok) throw new Error(`Failed to fetch sizes for shirt ${id}: ${res.status}`);
  return res.json();
}

// ✅ This matches your backend
export async function checkout(items) {
  const res = await fetch(`${BASE_URL}/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Checkout failed: ${res.status}`);
  return data; // { success, message, orderId }
}