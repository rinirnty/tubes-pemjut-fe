import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="footer-grid">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">🌾 Panen<span>Ku</span></Link>
        <p>Platform penyedia bahan pangan pokok — beras putih, beras ketan, ubi jalar, ubi kayu — yang menghubungkan pembeli dan admin dalam satu ekosistem digital.</p>
      </div>
      <div className="footer-col">
        <h4>Produk</h4>
        <ul>
          <li><Link to="/catalog?kat=beras-putih">Beras Putih</Link></li>
          <li><Link to="/catalog?kat=beras-ketan">Beras Ketan</Link></li>
          <li><Link to="/catalog?kat=ubi-jalar">Ubi Jalar</Link></li>
          <li><Link to="/catalog?kat=ubi-kayu">Ubi Kayu / Singkong</Link></li>
          <li><Link to="/catalog?kat=beras-merah">Beras Merah</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Platform</h4>
        <ul>
          <li><a href="#cara-kerja">Cara Kerja</a></li>
          <li><Link to="/about">Tentang Kami</Link></li>
          <li><Link to="/contact">Kontak</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Bantuan</h4>
        <ul>
          <li><Link to="/contact">FAQ</Link></li>
          <li><a href="#">Syarat & Ketentuan</a></li>
          <li><a href="#">Kebijakan Privasi</a></li>
          <li><Link to="/contact">Hubungi Kami</Link></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2025 PanenKu. Semua hak dilindungi.</span>
      <span>🌾 Bahan pokok berkualitas untuk Indonesia</span>
    </div>
  </footer>
);

export default Footer;
