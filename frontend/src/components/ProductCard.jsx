import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={styles.imageWrap}>
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{
              ...styles.image,
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>

        <div style={styles.body}>
          <div style={styles.title}>{product.title}</div>
          <div style={styles.price}>₹{product.price}</div>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    border: "1px solid #eee",
    borderRadius: 16,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  },
  imageWrap: {
    width: "100%",
    height: 280,
    overflow: "hidden",
    background: "#f6f6f6",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.35s ease",
    display: "block",
  },
  body: {
    padding: 14,
  },
  title: {
    fontWeight: 800,
    fontSize: 14,
    lineHeight: 1.4,
    minHeight: 40,
  },
  price: {
    marginTop: 8,
    fontWeight: 900,
    fontSize: 16,
  },
};