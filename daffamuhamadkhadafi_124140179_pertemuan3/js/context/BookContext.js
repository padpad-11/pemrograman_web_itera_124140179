// Context API
// Dipakai supaya data buku bisa diakses dari halaman mana saja
// tanpa harus mengirim props satu per satu.
const BookContext = createContext();


// Provider: menyimpan data buku dan fungsi untuk mengubahnya
function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  // Tambah buku baru
  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]);
  };

  // Edit buku berdasarkan id
  const updateBook = (id, newData) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...newData };
      }
      return book;
    });

    setBooks(updatedBooks);
  };

  // Hapus buku berdasarkan id
  const deleteBook = (id) => {
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks(filteredBooks);
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// Hook kecil untuk mengambil data dari context
function useBooks() {
  return useContext(BookContext);
}
