import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  if (!state?.orderId) {
    return (
      <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
        <h2>Order Success</h2>
        <p>No order data found.</p>
        <Link to="/shop">Go to Shop</Link>
      </div>
    );
  }

  const { orderId, items, subtotal, shipping, grandTotal } = state;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <div style={styles.card}>
        <div style={styles.badge}>ORDER PLACED</div>
        <h2 style={{ marginTop: 10 }}>Thanks! Your order is confirmed.</h2>
        <p style={{ opacity: 0.75 }}>Order ID: <b>{orderId}</b></p>

        <div style={{ marginTop: 14 }}>
          <div style={styles.sectionTitle}>Summary</div>
          <div style={styles.row}><span>Subtotal</span><b>₹{subtotal.toFixed(2)}</b></div>
          <div style={styles.row}><span>Shipping</span><b>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</b></div>
          <div style={styles.row}><span>Total</span><b>₹{grandTotal.toFixed(2)}</b></div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={styles.sectionTitle}>Items</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((it, idx) => (
              <div key={idx} style={styles.itemRow}>
                <span>Shirt #{it.shirtId}</span>
                <span>Size {it.size}</span>
                <b>Qty {it.quantity}</b>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button style={styles.secondary} disabled title="Coming soon">
            Track Order (later)
          </button>
          <Link to="/shop" style={{ textDecoration: "none" }}>
            <button style={styles.primary}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: 18,
    padding: 16,
    background: "white",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  badge: {
    display: "inline-block",
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 1,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#eefaf0",
    border: "1px solid #9be3b0",
    color: "#0b5f28",
  },
  sectionTitle: { fontWeight: 900, marginBottom: 8 },
  row: { display: "flex", justifyContent: "space-between", marginTop: 8 },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 12px",
    border: "1px solid #eee",
    borderRadius: 12,
  },
  primary: {
    background: "black",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
  },
  secondary: {
    background: "white",
    color: "black",
    border: "1px solid #ddd",
    padding: "12px 16px",
    borderRadius: 12,
    cursor: "not-allowed",
    fontWeight: 900,
    opacity: 0.6,
  },
};