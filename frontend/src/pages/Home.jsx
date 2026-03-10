import { Link } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.brand}>RAWSTANDARD</div>

          <h1 style={styles.title}>
            Premium embroidered
            <br />
            shirts.
          </h1>

          <p style={styles.subtitle}>
            Sharp silhouettes. Signature embroidery. Limited stock drops
            designed for standout everyday wear.
          </p>

          <div style={styles.ctaRow}>
            <Link to="/shop" style={styles.primaryBtn}>
              Shop Collection
            </Link>

            <Link to="/shop" style={styles.secondaryBtn}>
              Explore Designs
            </Link>
          </div>

          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>4</div>
              <div style={styles.statLabel}>Sizes</div>
            </div>

            <div style={styles.stat}>
              <div style={styles.statNumber}>Premium</div>
              <div style={styles.statLabel}>Embroidery</div>
            </div>

            <div style={styles.stat}>
              <div style={styles.statNumber}>Limited</div>
              <div style={styles.statLabel}>Stock</div>
            </div>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Why RAWSTANDARD</h3>

            <ul style={styles.list}>
              <li>Premium embroidery craftsmanship</li>
              <li>Clean tailored silhouette</li>
              <li>Limited stock per size</li>
              <li>Modern statement styling</li>
            </ul>

            <p style={styles.tip}>
              Explore the latest drop from the Shop page and pick your signature
              shirt.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.collection}>
        <h2 style={styles.sectionTitle}>Signature Embroidery</h2>

        <div style={styles.collectionGrid}>
          <div style={styles.collectionCard}>
            <h3 style={styles.cardTitle}>Stag Series</h3>
            <p style={styles.cardText}>
              Bold embroidered shirts with a strong visual identity.
            </p>
            <Link to="/shop" style={styles.cardLink}>
              Explore →
            </Link>
          </div>

          <div style={styles.collectionCard}>
            <h3 style={styles.cardTitle}>Rider Series</h3>
            <p style={styles.cardText}>
              Heritage-inspired embroidery with a refined silhouette.
            </p>
            <Link to="/shop" style={styles.cardLink}>
              Explore →
            </Link>
          </div>

          <div style={styles.collectionCard}>
            <h3 style={styles.cardTitle}>Statement Essentials</h3>
            <p style={styles.cardText}>
              Clean premium shirts designed for standout everyday wear.
            </p>
            <Link to="/shop" style={styles.cardLink}>
              Explore →
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Explore the full RAWSTANDARD collection</h2>
        <p style={styles.ctaText}>
          Discover premium embroidered shirts built for modern everyday style.
        </p>

        <Link to="/shop" style={styles.primaryBtn}>
          View All Shirts
        </Link>
      </section>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 80px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 60,
    flexWrap: "wrap",
  },

  heroLeft: {
    flex: 1,
    minWidth: 320,
    maxWidth: 650,
  },

  brand: {
    letterSpacing: 4,
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: "#555",
  },

  title: {
    fontSize: 64,
    lineHeight: 1.05,
    margin: "0 0 20px 0",
    fontWeight: 800,
  },

  subtitle: {
    fontSize: 20,
    color: "#555",
    lineHeight: 1.6,
    marginBottom: 30,
    maxWidth: 560,
  },

  ctaRow: {
    display: "flex",
    gap: 16,
    marginBottom: 32,
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#000",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 700,
    display: "inline-block",
  },

  secondaryBtn: {
    border: "1px solid #ddd",
    padding: "14px 24px",
    borderRadius: 12,
    textDecoration: "none",
    color: "#000",
    fontWeight: 600,
    display: "inline-block",
    background: "#fff",
  },

  stats: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },

  stat: {
    border: "1px solid #eee",
    padding: "16px 20px",
    borderRadius: 14,
    minWidth: 130,
    background: "#fff",
  },

  statNumber: {
    fontWeight: 800,
    fontSize: 20,
    marginBottom: 6,
  },

  statLabel: {
    fontSize: 14,
    color: "#666",
  },

  heroRight: {
    flex: 1,
    minWidth: 320,
    maxWidth: 520,
  },

  infoCard: {
    border: "1px solid #eee",
    borderRadius: 18,
    padding: 28,
    background: "#fafafa",
  },

  infoTitle: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 24,
  },

  list: {
    margin: 0,
    paddingLeft: 22,
    lineHeight: 2,
    fontSize: 17,
  },

  tip: {
    marginTop: 18,
    fontSize: 15,
    color: "#666",
    lineHeight: 1.6,
  },

  collection: {
    marginTop: 80,
  },

  sectionTitle: {
    fontSize: 30,
    marginBottom: 28,
  },

  collectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
  },

  collectionCard: {
    border: "1px solid #eee",
    borderRadius: 18,
    padding: 24,
    background: "#fff",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 24,
  },

  cardText: {
    color: "#555",
    lineHeight: 1.7,
    marginBottom: 18,
    fontSize: 16,
  },

  cardLink: {
    textDecoration: "none",
    fontWeight: 700,
    color: "#000",
  },

  ctaSection: {
    marginTop: 90,
    textAlign: "center",
    padding: "40px 20px 10px",
  },

  ctaTitle: {
    fontSize: 34,
    marginBottom: 12,
  },

  ctaText: {
    color: "#666",
    marginBottom: 24,
    fontSize: 17,
  },
};