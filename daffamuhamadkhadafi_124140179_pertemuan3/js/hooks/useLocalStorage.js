// Custom hook 1: useLocalStorage
// Fungsinya seperti useState, tetapi nilainya disimpan di localStorage
// sehingga data tidak hilang saat halaman di-refresh.
function useLocalStorage(key, initialValue) {

  // Ambil data awal dari localStorage (kalau ada)
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (saved) {
        return JSON.parse(saved);
      }

      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Setiap value berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
