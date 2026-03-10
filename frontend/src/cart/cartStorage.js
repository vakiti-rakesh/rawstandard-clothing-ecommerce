// src/cart/cartStorage.js
const KEY = "rawstandard_cart_v1";
const EVT = "rawstandard_cart_updated";

function notify() {
  window.dispatchEvent(new Event(EVT));
}

export function readCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function writeCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  notify();
}

export function addToCart({ shirtId, size, quantity }) {
  const cart = readCart();
  const idx = cart.findIndex((i) => i.shirtId === shirtId && i.size === size);
  if (idx >= 0) cart[idx].quantity += quantity;
  else cart.push({ shirtId, size, quantity });
  writeCart(cart);
  return cart;
}

export function removeFromCart(shirtId, size) {
  const cart = readCart().filter((i) => !(i.shirtId === shirtId && i.size === size));
  writeCart(cart);
  return cart;
}

export function updateQty(shirtId, size, quantity) {
  const q = Number(quantity);
  const cart = readCart()
    .map((i) => (i.shirtId === shirtId && i.size === size ? { ...i, quantity: q } : i))
    .filter((i) => i.quantity > 0);
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart([]);
}

export const CART_EVENT = EVT;