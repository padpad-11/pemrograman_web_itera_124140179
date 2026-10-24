// Komponen utama: navbar + pengaturan halaman (React Router)
function App() {
  return (
    <div>

      <nav className="navbar">
        <h1>📚 Manajemen Buku</h1>
        <Link to="/">Beranda</Link>
        <Link to="/stats">Statistik</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>

    </div>
  );
}
