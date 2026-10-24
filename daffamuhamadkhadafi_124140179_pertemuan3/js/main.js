// Menampilkan aplikasi ke halaman (elemen #root di index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <BookProvider>
      <App />
    </BookProvider>
  </HashRouter>
);
