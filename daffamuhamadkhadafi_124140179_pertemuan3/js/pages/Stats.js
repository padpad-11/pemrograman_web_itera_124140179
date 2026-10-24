// Halaman Statistik
// Menampilkan jumlah buku berdasarkan status.
function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div>
      <h2>Statistik Buku</h2>

      <div className="stats-grid">

        <div className="stats-card">
          <h3>{stats.total}</h3>
          <p>Total Buku</p>
        </div>

        <div className="stats-card">
          <h3>{stats.milik}</h3>
          <p>Milik</p>
        </div>

        <div className="stats-card">
          <h3>{stats.baca}</h3>
          <p>Sedang Dibaca</p>
        </div>

        <div className="stats-card">
          <h3>{stats.beli}</h3>
          <p>Ingin Dibeli</p>
        </div>

      </div>
    </div>
  );
}
