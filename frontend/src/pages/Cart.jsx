import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkout, fetchShirtById } from "../api/shirtsApi";
import { clearCart, readCart, removeFromCart, updateQty } from "../cart/cartStorage";
import Toast from "../components/Toast";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [productsById, setProductsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "success" });

  useEffect(() => {
    setCart(readCart());
  }, []);

  useEffect(() => {
    (async () => {
      const ids = [...new Set(cart.map((i) => i.shirtId))];
      if (ids.length === 0) {
        setProductsById({});
        return;
      }

      const map = {};
      for (const id of ids) {
        try {
          map[id] = await fetchShirtById(id);
        } catch {
          // leave missing
        }
      }
      setProductsById(map);
    })();
  }, [cart]);

  const subtotal = useMemo(() => {
    let sum = 0;
    for (const item of cart) {
      const p = productsById[item.shirtId];
      const price = p?.price ? Number(p.price) : 0;
      sum += price * Number(item.quantity);
    }
    return sum;
  }, [cart, productsById]);

  const shipping = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= 1999 ? 0 : 99; // fake shipping rule
  }, [cart.length, subtotal]);

  const grandTotal = subtotal + shipping;

  function onRemove(shirtId, size) {
    setCart(removeFromCart(shirtId, size));
  }

  function onQtyChange(shirtId, size, val) {
    const q = Math.max(1, Number(val) || 1);
    setCart(updateQty(shirtId, size, q));
  }

  async function onCheckout() {
  try {
    if (cart.length === 0) return;

    setLoading(true);

    const items = cart.map((i) => ({
      shirtId: i.shirtId,
      size: i.size,
      quantity: Number(i.quantity),
    }));

    const res = await checkout({ items });

    clearCart();
    setCart([]);

    navigate("/order-success", {
      state: {
        orderId: res.orderId,
        items,
        subtotal,
        shipping,
        grandTotal,
      },
    });
  } catch (e) {
    setToast({ msg: e.message || "Checkout failed", type: "error" });
  } finally {
    setLoading(false);
  }
}

  return (
    <div style={styles.wrap}>
      <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: "", type: "success" })} />

      <div style={styles.topRow}>
        <h2 style={{ margin: 0 }}>Your Cart</h2>
        <Link to="/shop" style={{ textDecoration: "none" }}>
          <button style={styles.secondary}>Continue Shopping</button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div style={styles.stateBox}>
          Your cart is empty. <Link to="/shop">Go to Shop</Link>
        </div>
      ) : (
        <div style={styles.layout}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map((item) => {
              const p = productsById[item.shirtId];
              return (
                <div key={`${item.shirtId}-${item.size}`} style={styles.item}>
                  {p?.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} style={styles.itemImg} />
                  ) : (
                    <div style={{ ...styles.itemImg, background: "#eee" }} />
                  )}

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900 }}>{p?.title || `Shirt #${item.shirtId}`}</div>
                    <div style={{ opacity: 0.8, marginTop: 4 }}>Size: {item.size}</div>
                    <div style={{ opacity: 0.9, marginTop: 6, fontWeight: 900 }}>₹{p?.price ?? "—"}</div>
                  </div>

                  <div style={styles.qtyCol}>
                    <div style={{ fontWeight: 800, fontSize: 12, opacity: 0.7 }}>QTY</div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onQtyChange(item.shirtId, item.size, e.target.value)}
                      style={styles.qtyInput}
                    />
                    <button onClick={() => onRemove(item.shirtId, item.size)} style={styles.linkBtn}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.summary}>
            <div style={styles.sumTitle}>Order Summary</div>

            <div style={styles.row}>
              <span>Subtotal</span>
              <b>₹{subtotal.toFixed(2)}</b>
            </div>

            <div style={styles.row}>
              <span>Shipping</span>
              <b>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</b>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />

            <div style={styles.row}>
              <span>Total</span>
              <b style={{ fontSize: 18 }}>₹{grandTotal.toFixed(2)}</b>
            </div>

            <button
              onClick={onCheckout}
              disabled={cart.length === 0 || loading}
              style={{
                ...styles.primary,
                ...(cart.length === 0 || loading ? { opacity: 0.5, cursor: "not-allowed" } : {}),
              }}
            >
              {loading ? "Placing Order..." : "Checkout"}
            </button>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
              Free shipping above ₹1999
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { padding: 20, maxWidth: 1100, margin: "0 auto" },
  topRow: { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" },
  secondary: {
    background: "white",
    color: "black",
    border: "1px solid #ddd",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
  },
  stateBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    border: "1px solid #eee",
    background: "white",
  },
  layout: { marginTop: 16, display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 },
  item: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 12,
    background: "white",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  itemImg: { width: 92, height: 92, borderRadius: 12, objectFit: "cover", border: "1px solid #eee" },
  qtyCol: { display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" },
  qtyInput: { width: 70, padding: "8px 10px", borderRadius: 12, border: "1px solid #ddd", fontWeight: 900 },
  linkBtn: { border: "none", background: "transparent", cursor: "pointer", color: "#a40000", fontWeight: 900 },
  summary: {
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 14,
    background: "white",
    height: "fit-content",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  sumTitle: { fontWeight: 900, marginBottom: 12 },
  row: { display: "flex", justifyContent: "space-between", marginTop: 10 },
  primary: {
    marginTop: 14,
    width: "100%",
    background: "black",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
  },
};