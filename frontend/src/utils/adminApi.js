import { API_BASE_URL } from "../config";

export async function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
}