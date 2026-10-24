// Komponen 3: BookList
// Menampilkan daftar buku beserta tombol Edit dan Hapus.

// Teks yang ditampilkan untuk setiap status
const labelStatus = {
  milik: 'Milik',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

function BookList({ books, onEdit, onDelete }) {

  // Kalau belum ada buku, tampilkan pesan
  if (books.length === 0) {
    return <p className="empty-text">Belum ada buku.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book-item">

          <div>
            <strong>{book.judul}</strong>
            <p>{book.penulis}</p>
            <span className={'badge badge-' + book.status}>
              {labelStatus[book.status]}
            </span>
          </div>

          <div className="book-actions">
            <button onClick={() => onEdit(book)}>Edit</button>
            <button className="danger" onClick={() => onDelete(book.id)}>
              Hapus
            </button>
          </div>

        </li>
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      judul: PropTypes.string.isRequired,
      penulis: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
