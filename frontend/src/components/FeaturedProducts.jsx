import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { API_BASE_URL } from "../config";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/shirts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to load featured products:", err);
      });
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Featured Shirts</h2>
        <Link to="/shop" style={styles.link}>
          View All →
        </Link>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: 80,
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
};