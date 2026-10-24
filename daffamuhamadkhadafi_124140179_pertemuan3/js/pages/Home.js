// Halaman Beranda
// Berisi form, pencarian/filter, dan daftar buku.
function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');

  // Kalau sedang edit -> update buku, kalau tidak -> tambah buku baru
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  // Terapkan filter status dan pencarian
  const visibleBooks = books.filter((book) => {
    const kata = search.toLowerCase();

    const cocokStatus = filter === 'semua' || book.status === filter;

    const cocokCari =
      book.judul.toLowerCase().includes(kata) ||
      book.penulis.toLowerCase().includes(kata);

    return cocokStatus && cocokCari;
  });

  return (
    <div>
      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <BookFilter
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <BookList
        books={visibleBooks}
        onEdit={setEditingBook}
        onDelete={deleteBook}
      />
    </div>
  );
}
