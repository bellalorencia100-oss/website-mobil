function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-red-900 text-white p-10">
      <nav>
        <h6 className="footer-title text-red-200">Layanan</h6>
        <a className="link link-hover hover:text-red-200 transition">
          Beli Mobil
        </a>
        <a className="link link-hover hover:text-red-200 transition">
          Jual Mobil
        </a>
        <a className="link link-hover hover:text-red-200 transition">
          Cek Harga
        </a>
        <a className="link link-hover hover:text-red-200 transition">
          Simulasi Kredit
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Perusahaan</h6>
        <a className="link link-hover hover:text-red-200 transition">
          Tentang Kami
        </a>
        <a className="link link-hover hover:text-red-200 transition">
          Hubungi Kami
        </a>
        <a className="link link-hover hover:text-red-200 transition">Karir</a>
      </nav>

      <nav>
        <h6 className="footer-title">Bantuan</h6>
        <a className="link link-hover hover:text-red-200 transition">FAQ</a>
        <a className="link link-hover hover:text-red-200 transition">S&K</a>
        <a className="link link-hover hover:text-red-200 transition">Privasi</a>
      </nav>
      <nav>
        <h6 className="footer-title text-red-200">Cari Berdasarkan Merek</h6>
        <a className="link link-hover hover:text-red-200 transition">Toyota</a>
        <a className="link link-hover hover:text-red-200 transition">
          Mitsubishi
        </a>
        <a className="link link-hover hover:text-red-200 transition">Suzuki</a>
        <a className="link link-hover hover:text-red-200 transition">Hyundai</a>
        <a className="link link-hover hover:text-red-200 transition">
          Chevrolet
        </a>
      </nav>

      <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="w-80">
          <label>Enter your email address</label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input join-item"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}
export default Footer;
