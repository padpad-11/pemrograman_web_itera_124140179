// Komponen 1: BookForm
// Form untuk menambah dan mengedit buku.
function BookForm({ onSubmit, editingBook, onCancel }) {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  // Kalau sedang edit, isi form dengan data buku yang dipilih
  useEffect(() => {
    if (editingBook) {
      setJudul(editingBook.judul);
      setPenulis(editingBook.penulis);
      setStatus(editingBook.status);
    }
  }, [editingBook]);

  // Dijalankan saat tombol submit ditekan
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi: judul dan penulis wajib diisi
    const newErrors = {};

    if (judul.trim() === '') {
      newErrors.judul = 'Judul wajib diisi';
    }

    if (penulis.trim() === '') {
      newErrors.penulis = 'Penulis wajib diisi';
    }

    setErrors(newErrors);

    // Kalau ada error, berhenti di sini
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({
      judul: judul.trim(),
      penulis: penulis.trim(),
      status: status,
    });

    // Kosongkan form
    setJudul('');
    setPenulis('');
    setStatus('milik');
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Edit Buku' : 'Tambah Buku'}</h2>

      {/* Input judul */}
      <label htmlFor="judul">Judul</label>
      <input
        id="judul"
        type="text"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        className={errors.judul ? 'input-error' : ''}
      />
      {errors.judul && <p className="error-text">{errors.judul}</p>}

      {/* Input penulis */}
      <label htmlFor="penulis">Penulis</label>
      <input
        id="penulis"
        type="text"
        value={penulis}
        onChange={(e) => setPenulis(e.target.value)}
        className={errors.penulis ? 'input-error' : ''}
      />
      {errors.penulis && <p className="error-text">{errors.penulis}</p>}

      {/* Pilihan status */}
      <label htmlFor="status">Status</label>
      <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="milik">Milik</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

      {/* Tombol */}
      <div className="form-buttons">
        <button type="submit">{editingBook ? 'Simpan' : 'Tambah'}</button>

        {editingBook && (
          <button type="button" className="gray" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.number,
    judul: PropTypes.string,
    penulis: PropTypes.string,
    status: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};
