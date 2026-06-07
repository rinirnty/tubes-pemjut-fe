import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="logo">🌾 Panen<span>Ku</span></Link>
      <ul className="nav-links">
        <li><a href="#produk">Produk</a></li>
        <li><Link to="/catalog">Katalog</Link></li>
        <li><a href="#cara-kerja">Cara Kerja</a></li>
        <li><Link to="/about">Tentang</Link></li>
        <li><Link to="/contact">Kontak</Link></li>
      </ul>
      <div className="nav-cta">
        <Link to="/login" className="btn btn-outline">Masuk</Link>
        <Link to="/register" className="btn btn-primary">Daftar Gratis</Link>
      </div>
    </nav>
  );
};

export default Navbar;
