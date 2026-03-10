import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CART_EVENT, readCart } from "../cart/cartStorage";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const updateCart = () => {
      const cart = readCart();
      const total = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
      setCount(total);
    };

    const onResize = () => setIsMobile(window.innerWidth <= 768);

    updateCart();
    onResize();

    window.addEventListener(CART_EVENT, updateCart);
    window.addEventListener("storage", updateCart);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener(CART_EVENT, updateCart);
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          RAWSTANDARD
        </Link>

        {!isMobile ? (
          <div style={styles.links}>
            <NavItem to="/" label="Home" />
            <NavItem to="/shop" label="Shop" />
            <Link to="/cart" style={styles.link}>
              Cart
              {count > 0 && <span style={styles.badge}>{count}</span>}
            </Link>
            <NavItem to="/admin" label="Admin" />
          </div>
        ) : (
          <div style={styles.mobileRight}>
            <Link to="/cart" style={styles.cartMini}>
              Cart
              {count > 0 && <span style={styles.badge}>{count}</span>}
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              style={styles.menuBtn}
              aria-label="Toggle menu"
            >
              <span style={styles.menuLine} />
              <span style={styles.menuLine} />
              <span style={styles.menuLine} />
            </button>
          </div>
        )}
      </nav>

      {isMobile && open && (
        <div style={styles.mobileMenu}>
          <MobileNavItem to="/" label="Home" />
          <MobileNavItem to="/shop" label="Shop" />
          <MobileNavItem to="/cart" label={`Cart${count > 0 ? ` (${count})` : ""}`} />
          <MobileNavItem to="/admin" label="Admin" />
        </div>
      )}
    </>
  );
}

function NavItem({ to, label }) {
  return (
    <Link to={to} style={styles.link}>
      {label}
    </Link>
  );
}

function MobileNavItem({ to, label }) {
  return (
    <Link to={to} style={styles.mobileLink}>
      {label}
    </Link>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #ececec",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 900,
    letterSpacing: 1.5,
    fontSize: 16,
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  link: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
  },

  badge: {
    marginLeft: 8,
    background: "#111",
    color: "#fff",
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 12,
    fontWeight: 800,
  },

  mobileRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  cartMini: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 800,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
  },

  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
  },

  menuLine: {
    width: 18,
    height: 2,
    background: "#111",
    display: "block",
    borderRadius: 2,
  },

  mobileMenu: {
    position: "sticky",
    top: 71,
    zIndex: 999,
    background: "#fff",
    borderBottom: "1px solid #ececec",
    boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  mobileLink: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 800,
    padding: "12px 10px",
    borderRadius: 12,
    border: "1px solid #f0f0f0",
    background: "#fafafa",
  },
};