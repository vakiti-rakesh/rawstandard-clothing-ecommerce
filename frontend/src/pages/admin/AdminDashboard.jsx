import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../../utils/adminApi";

export default function AdminDashboard() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStockCount: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const savedUsername = localStorage.getItem("adminUsername");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    setUsername(savedUsername || "Admin");
    loadDashboardStats();
  }, [navigate]);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await adminFetch("/api/admin/dashboard/stats");
      setStats(data);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin-login");
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>RAWSTANDARD</h2>
          <p style={styles.role}>Admin Panel</p>

          <div style={styles.menu}>
            <button style={styles.menuButton}>Dashboard</button>
            <button style={styles.menuButton} onClick={() => navigate("/admin/products")}>
              Products
            </button>
            <button style={styles.menuButton} onClick={() => navigate("/admin/add-product")}>
              Add Product
            </button>
            <button style={styles.menuButton} onClick={() => navigate("/admin/orders")}>
              Orders
            </button>
          </div>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Welcome, {username}</h1>
            <p style={styles.subheading}>
              Manage your store, products, stock, and orders
            </p>
          </div>
        </div>

        {loading ? <p>Loading dashboard...</p> : null}
        {error ? <p style={styles.error}>{error}</p> : null}

        {!loading && !error ? (
          <>
            <section style={styles.cards}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Total Products</h3>
                <p style={styles.cardValue}>{stats.totalProducts}</p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Orders</h3>
                <p style={styles.cardValue}>{stats.totalOrders}</p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Low Stock</h3>
                <p style={styles.cardValue}>{stats.lowStockCount}</p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Revenue</h3>
                <p style={styles.cardValue}>₹{stats.totalRevenue}</p>
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Quick Actions</h2>

              <div style={styles.actionGrid}>
                <button style={styles.actionBtn} onClick={() => navigate("/admin/add-product")}>
                  Add New Product
                </button>
                <button style={styles.actionBtn} onClick={() => navigate("/admin/products")}>
                  Manage Products
                </button>
                <button style={styles.actionBtn} onClick={() => navigate("/admin/orders")}>
                  View Orders
                </button>
                <button style={styles.actionBtn} onClick={loadDashboardStats}>
                  Refresh Dashboard
                </button>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#f5f5f5",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#111",
    color: "#fff",
    padding: "24px 18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
  role: {
    marginTop: "8px",
    color: "#bbb",
    fontSize: "14px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "30px",
  },
  menuButton: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    border: "1px solid #2d2d2d",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
  main: {
    flex: 1,
    padding: "28px",
  },
  topbar: {
    marginBottom: "24px",
  },
  heading: {
    margin: 0,
    fontSize: "30px",
    color: "#111",
  },
  subheading: {
    marginTop: "8px",
    color: "#666",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "15px",
    color: "#555",
  },
  cardValue: {
    margin: "12px 0 0 0",
    fontSize: "28px",
    fontWeight: "700",
    color: "#111",
  },
  section: {
    marginBottom: "28px",
  },
  sectionTitle: {
    marginBottom: "14px",
    fontSize: "20px",
    color: "#111",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },
  actionBtn: {
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontWeight: "600",
  },
};