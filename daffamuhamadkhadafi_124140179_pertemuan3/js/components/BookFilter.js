// Komponen 2: BookFilter
// Kolom pencarian (judul / penulis) dan filter berdasarkan status.
function BookFilter({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="book-filter">

      {/* Pencarian */}
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Filter status */}
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="semua">Semua</option>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

    </div>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
