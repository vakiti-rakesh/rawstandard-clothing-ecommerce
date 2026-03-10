import { useState } from "react";
import { API_BASE_URL } from "../../config";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    embroideryDesign: "",
    imageUrl: "",
    price: "",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...form.sizes];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [field]: field === "stock" ? Number(value) : value,
    };

    setForm((prev) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
      };

      const res = await fetch(`${API_BASE_URL}/api/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to create product");
      }

      setMessage(data.message || "Product created successfully");

      setForm({
        title: "",
        slug: "",
        description: "",
        embroideryDesign: "",
        imageUrl: "",
        price: "",
        sizes: [
          { size: "S", stock: 0 },
          { size: "M", stock: 0 },
          { size: "L", stock: 0 },
          { size: "XL", stock: 0 },
        ],
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Add Product</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} style={styles.input} />
          <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} style={styles.input} />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} style={styles.input} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} style={styles.input} />
          <input name="embroideryDesign" placeholder="Embroidery Design" value={form.embroideryDesign} onChange={handleChange} style={styles.input} />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <h3>Sizes & Stock</h3>

          <div style={styles.sizesGrid}>
            {form.sizes.map((item, index) => (
              <div key={item.size} style={styles.sizeBox}>
                <input
                  value={item.size}
                  onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                  style={styles.input}
                />
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                  style={styles.input}
                  placeholder="Stock"
                />
              </div>
            ))}
          </div>

          {message ? <p style={styles.success}>{message}</p> : null}
          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" style={styles.button}>Create Product</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  title: {
    marginTop: 0,
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  textarea: {
    minHeight: "120px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
  },
  sizesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  sizeBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  button: {
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
  success: {
    color: "green",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontWeight: "600",
  },
};