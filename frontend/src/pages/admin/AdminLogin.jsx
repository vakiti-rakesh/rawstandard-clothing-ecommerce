import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function AdminLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", form.username);

      navigate("/admin");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <form style={styles.card} onSubmit={handleSubmit}>
          <h1 style={styles.title}>RAWSTANDARD Admin</h1>
          <p style={styles.subtitle}>Sign in to manage products and orders</p>

          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter admin username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 40%, #2b2b2b 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  overlay: {
    width: "100%",
    maxWidth: "420px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    color: "#111",
  },
  subtitle: {
    margin: "0 0 12px 0",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#222",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #d0d0d0",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    marginTop: "8px",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    margin: 0,
    color: "#d93025",
    fontSize: "14px",
  },
};