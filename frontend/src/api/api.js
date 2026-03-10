const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getShirts() {
  const res = await fetch(`${BASE_URL}/api/shirts`);
  if (!res.ok) throw new Error(`Failed to load shirts: ${res.status}`);
  return res.json();
}

export async function purchaseShirt({ shirtId, size, quantity }) {
  const res = await fetch(`${BASE_URL}/api/shirts/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shirtId, size, quantity }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `Purchase failed: ${res.status}`);
  return data;
}