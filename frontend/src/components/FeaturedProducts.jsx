import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { API_BASE_URL } from "../config";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        if (!API_BASE_URL) {
          throw new Error("VITE_API_BASE_URL is not defined");
        }

        const res = await fetch(`${API_BASE_URL}/api/shirts`);

        if (!res.ok) {
          throw new Error(`Failed to fetch featured products: ${res.status}`);
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to load featured products:", err);
      }
    }

    loadProducts();
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