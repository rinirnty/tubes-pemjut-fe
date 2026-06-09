import { Link, useLocation } from "react-router-dom";

function TopbarAdmin() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      height: "64px",
      background: "var(--brown)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link to="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#fff",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: ".4rem"
        }}>
          🌾 Panen<span style={{ color: "var(--gold2)" }}>Ku</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard") ? "top-nav-item active" : "top-nav-item"}>
            Dashboard
          </Link>
          <Link to="/admin/products" className={isActive("/admin/products") ? "top-nav-item active" : "top-nav-item"}>
            Produk
          </Link>
          <Link to="/admin/orders" className={isActive("/admin/orders") ? "top-nav-item active" : "top-nav-item"}>
            Pesanan <span style={{
              marginLeft: ".5rem",
              background: "var(--gold)",
              color: "#fff",
              fontSize: ".65rem",
              fontWeight: 700,
              padding: ".15rem .45rem",
              borderRadius: "999px"
            }}>12</span>
          </Link>
          <Link to="/admin/clients" className={isActive("/admin/clients") ? "top-nav-item active" : "top-nav-item"}>
            Pengguna
          </Link>
          <Link to="/admin/reports" className={isActive("/admin/reports") ? "top-nav-item active" : "top-nav-item"}>
            Laporan
          </Link>
          <Link to="#" className="top-nav-item">
            Pengaturan
          </Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem"
          }}>
          </div>
          <div style={{ color: "#fff" }}>
            <div style={{ fontSize: ".82rem", fontWeight: 600 }}>Admin PanenKu</div>
            <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.6)" }}>admin@panenku.com</div>
          </div>
        </div>
        <button style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,.65)",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "color .2s"
        }} onClick={() => window.location.href = "/login"}>
          🚪
        </button>
      </div>

      <style jsx>{`
        .top-nav-item {
          padding: ".5rem 1rem",
          textDecoration: none;
          color: rgba(255,255,255,.7);
          font-size: .88rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all .2s;
          display: flex;
          align-items: center;
        }
        .top-nav-item:hover {
          background: rgba(255,255,255,.1);
          color: #fff;
        }
        .top-nav-item.active {
          background: rgba(255,255,255,.15);
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default TopbarAdmin;
