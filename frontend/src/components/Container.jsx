export default function Container({ children }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px" }}>
      {children}
    </div>
  );
}