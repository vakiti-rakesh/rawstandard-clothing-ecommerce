import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import { fetchShirts } from "../api/shirtsApi";


export default function Shop() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchShirts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((p) => (p.title || "").toLowerCase().includes(s));
    }

    const min = minP === "" ? null : Number(minP);
    const max = maxP === "" ? null : Number(maxP);
    if (min != null && !Number.isNaN(min)) list = list.filter((p) => Number(p.price) >= min);
    if (max != null && !Number.isNaN(max)) list = list.filter((p) => Number(p.price) <= max);

    if (sort === "priceLow") list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "priceHigh") list.sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "newest") list.sort((a, b) => Number(b.id) - Number(a.id));

    return list;
  }, [products, q, sort, minP, maxP]);

  return (
    <Container>
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>SHOP</div>
          <h2 style={{ margin: "6px 0" }}>New Drop</h2>
          <div style={{ opacity: 0.75, fontWeight: 700 }}>Essentials built for everyday.</div>
        </div>

        <div style={styles.filters}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            style={styles.input}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
            <option value="newest">Newest</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>

          <input value={minP} onChange={(e) => setMinP(e.target.value)} placeholder="Min ₹" style={styles.small} />
          <input value={maxP} onChange={(e) => setMaxP(e.target.value)} placeholder="Max ₹" style={styles.small} />
        </div>
      </div>

      {loading && <div style={styles.state}>Loading products...</div>}
      {!loading && err && <div style={{ ...styles.state, borderColor: "#ffb6b6", background: "#fff3f3" }}>{err}</div>}
      {!loading && !err && filtered.length === 0 && <div style={styles.state}>No products found.</div>}

      {!loading && !err && filtered.length > 0 && (
        <div style={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Container>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  kicker: { fontWeight: 900, letterSpacing: 2, fontSize: 12, opacity: 0.7 },
  filters: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  input: { padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minWidth: 220 },
  select: { padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" },
  small: { padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", width: 110 },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16, marginTop: 10 },
  state: { padding: 14, borderRadius: 14, border: "1px solid #eee", background: "white" },
};