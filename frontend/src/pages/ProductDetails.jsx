import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchShirtById, fetchShirts, fetchShirtSizes } from "../api/shirtsApi";
import { addToCart } from "../cart/cartStorage";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selected, setSelected] = useState("");
  const [qty, setQty] = useState(1);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [hoveredImage, setHoveredImage] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await fetchShirtById(id);
        setProduct(data);

        if (Array.isArray(data.sizes) && data.sizes.length > 0) {
          setSizes(
            data.sizes.map((s) => ({
              size: s.size,
              stock: typeof s.stock === "number" ? s.stock : Number(s.stock),
            }))
          );
        } else {
          try {
            const sizeData = await fetchShirtSizes(id);
            setSizes(
              (sizeData || []).map((s) => ({
                size: s.size,
                stock: typeof s.stock === "number" ? s.stock : Number(s.stock),
              }))
            );
          } catch {
            setSizes([]);
          }
        }

        const all = await fetchShirts();
        const filtered = (all || [])
          .filter((p) => Number(p.id) !== Number(id))
          .slice(0, 4);
        setRelated(filtered);
      } catch (e) {
        setToast({ msg: e.message || "Failed to load product", type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const sizeList = useMemo(() => {
    if (!sizes || sizes.length === 0) {
      return [
        { size: "S", stock: null },
        { size: "M", stock: null },
        { size: "L", stock: null },
        { size: "XL", stock: null },
      ];
    }

    const order = { S: 1, M: 2, L: 3, XL: 4, XXL: 5 };
    return [...sizes].sort((a, b) => (order[a.size] || 99) - (order[b.size] || 99));
  }, [sizes]);

  const selectedRow = useMemo(
    () => sizeList.find((s) => s.size === selected),
    [sizeList, selected]
  );

  const stockText = useMemo(() => {
    if (!selectedRow) return "";
    const st = selectedRow.stock;
    if (st == null || Number.isNaN(st)) return "";
    if (st <= 0) return "Out of stock";
    if (st <= 2) return `Only ${st} left`;
    return `${st} available`;
  }, [selectedRow]);

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }

  function inc() {
    setQty((q) => Math.min(99, q + 1));
  }

  function handleAddToCart() {
    if (!product) return;

    if (!selected) {
      return setToast({ msg: "Please select a size", type: "error" });
    }

    const st = selectedRow?.stock;
    if (st != null && !Number.isNaN(st)) {
      if (st <= 0) return setToast({ msg: "This size is out of stock", type: "error" });
      if (qty > st) return setToast({ msg: `Only ${st} left`, type: "error" });
    }

    addToCart({
      shirtId: product.id,
      size: selected,
      quantity: qty,
    });

    setToast({ msg: "Added to cart ✅", type: "success" });
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!product) {
    return <div style={{ padding: 20 }}>Product not found.</div>;
  }

  return (
    <div style={{ ...styles.page, paddingBottom: isMobile ? 110 : 40 }}>
      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "", type: "success" })}
      />

      <div
        style={{
          ...styles.mainGrid,
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 20 : 34,
        }}
      >
        {/* IMAGE */}
        <div style={styles.imagePanel}>
          <div
            style={styles.imageBox}
            onMouseEnter={() => setHoveredImage(true)}
            onMouseLeave={() => setHoveredImage(false)}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{
                ...styles.mainImage,
                transform: hoveredImage ? "scale(1.07)" : "scale(1)",
              }}
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <div style={styles.brand}>RAWSTANDARD</div>
          <h1 style={styles.title}>{product.title}</h1>
          <div style={styles.price}>₹{product.price}</div>

          <div style={styles.description}>{product.description}</div>

          <div style={styles.metaBox}>
            <div><b>Embroidery:</b> {product.embroideryDesign}</div>
            <div><b>Dispatch:</b> 24–48 hours</div>
            <div><b>Returns:</b> 7 days easy return</div>
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={styles.label}>Select Size</div>

            <div style={styles.sizeRow}>
              {sizeList.map((s) => {
                const hasStock = s.stock != null && !Number.isNaN(s.stock);
                const out = hasStock ? s.stock <= 0 : false;
                const active = selected === s.size;

                return (
                  <button
                    key={s.size}
                    onClick={() => setSelected(s.size)}
                    disabled={out}
                    style={{
                      ...styles.sizeBtn,
                      ...(active ? styles.sizeBtnActive : {}),
                      ...(out ? styles.sizeBtnDisabled : {}),
                    }}
                  >
                    {s.size}
                  </button>
                );
              })}
            </div>

            {selected && stockText && (
              <div
                style={{
                  marginTop: 10,
                  fontWeight: 900,
                  color: stockText.startsWith("Only") ? "#b15d00" : "#111",
                }}
              >
                {stockText}
              </div>
            )}
          </div>

          <div style={{ marginTop: 22 }}>
            <div style={styles.label}>Quantity</div>

            <div style={styles.qtyRow}>
              <button onClick={dec} style={styles.qtyBtn}>−</button>
              <div style={styles.qtyBox}>{qty}</div>
              <button onClick={inc} style={styles.qtyBtn}>+</button>
            </div>
          </div>

          {!isMobile && (
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <button onClick={handleAddToCart} style={styles.primaryBtn}>
                Add to Cart
              </button>
              <button onClick={() => navigate("/cart")} style={styles.secondaryBtn}>
                Go to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      <div style={{ marginTop: 48 }}>
        <div style={styles.sectionTitle}>You may also like</div>

        <div
          style={{
            ...styles.relatedGrid,
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : "repeat(4, 1fr)",
          }}
        >
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* STICKY BAR */}
      <div
        style={{
          ...styles.stickyBar,
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? 10 : 12,
        }}
      >
        <div style={styles.stickyInfo}>
          <div style={styles.stickyTitle}>{product.title}</div>
          <div style={styles.stickyPrice}>₹{product.price}</div>
        </div>

        <div style={styles.stickyControls}>
          <div style={styles.smallQtyRow}>
            <button onClick={dec} style={styles.smallQtyBtn}>−</button>
            <div style={styles.smallQtyBox}>{qty}</div>
            <button onClick={inc} style={styles.smallQtyBtn}>+</button>
          </div>

          <button onClick={handleAddToCart} style={styles.primaryBtn}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 1150,
    margin: "0 auto",
    padding: 20,
  },

  mainGrid: {
    display: "grid",
    alignItems: "start",
  },

  imagePanel: {
    position: "sticky",
    top: 90,
  },

  imageBox: {
    border: "1px solid #eee",
    borderRadius: 20,
    overflow: "hidden",
    background: "#f6f6f6",
  },

  mainImage: {
    width: "100%",
    height: 540,
    objectFit: "cover",
    display: "block",
    transition: "transform 0.35s ease",
  },

  brand: {
    fontWeight: 900,
    letterSpacing: 2,
    fontSize: 12,
    opacity: 0.65,
  },

  title: {
    margin: "8px 0 0 0",
    fontSize: 32,
    lineHeight: 1.1,
    fontWeight: 900,
  },

  price: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 900,
  },

  description: {
    marginTop: 16,
    lineHeight: 1.7,
    opacity: 0.85,
  },

  metaBox: {
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 14,
    borderRadius: 16,
    border: "1px solid #eee",
    background: "#fafafa",
    fontSize: 14,
  },

  label: {
    fontWeight: 900,
    marginBottom: 10,
  },

  sizeRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },

  sizeBtn: {
    minWidth: 56,
    height: 44,
    padding: "0 14px",
    borderRadius: 12,
    border: "2px solid #111",
    background: "#fff",
    color: "#111",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 14,
  },

  sizeBtnActive: {
    background: "#111",
    color: "#fff",
  },

  sizeBtnDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
    borderColor: "#999",
  },

  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  qtyBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    border: "2px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 22,
  },

  qtyBox: {
    width: 62,
    height: 46,
    borderRadius: 12,
    border: "2px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 16,
    background: "#fff",
  },

  primaryBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "13px 18px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 900,
    minWidth: 160,
  },

  secondaryBtn: {
    background: "#fff",
    color: "#111",
    border: "1px solid #ddd",
    padding: "13px 18px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 900,
    minWidth: 140,
  },

  sectionTitle: {
    fontWeight: 900,
    fontSize: 20,
    marginBottom: 14,
  },

  relatedGrid: {
    display: "grid",
    gap: 16,
  },

  stickyBar: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255,255,255,0.96)",
    borderTop: "1px solid #eee",
    padding: "12px 18px",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 100,
    backdropFilter: "blur(10px)",
    boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
  },

  stickyInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  stickyTitle: {
    fontWeight: 900,
    fontSize: 14,
  },

  stickyPrice: {
    fontWeight: 900,
    fontSize: 16,
  },

  stickyControls: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
  },

  smallQtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  smallQtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 18,
  },

  smallQtyBox: {
    width: 44,
    height: 38,
    borderRadius: 10,
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    background: "#fff",
  },
};