import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), 2200);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const bg = type === "error" ? "#ffefef" : "#eefaf0";
  const border = type === "error" ? "#ffb6b6" : "#9be3b0";
  const color = type === "error" ? "#a40000" : "#0b5f28";

  return (
    <div style={{
      position: "fixed",
      top: 16,
      right: 16,
      zIndex: 9999,
      background: bg,
      border: `1px solid ${border}`,
      color,
      padding: "10px 12px",
      borderRadius: 10,
      minWidth: 220,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>{type === "error" ? "Error" : "Done"}</div>
        <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ marginTop: 6, fontSize: 14 }}>{message}</div>
    </div>
  );
}