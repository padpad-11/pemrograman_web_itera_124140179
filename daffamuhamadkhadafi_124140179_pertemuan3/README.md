# Aplikasi Manajemen Buku Pribadi

Tugas Praktikum PAW Pertemuan 3 (React Basics)
Nama : Daffa Muhamad Khadafi
NIM  : 124140179

## Deskripsi
Aplikasi untuk mencatat buku yang dimiliki, sedang dibaca, atau ingin dibeli.

## Fitur
- Tambah, edit, dan hapus buku
- Filter buku berdasarkan status (milik / baca / beli)
- Pencarian berdasarkan judul atau penulis
- Halaman statistik jumlah buku
- Validasi form (judul dan penulis wajib diisi, ada feedback visual)
- Data tersimpan di `localStorage`

## Cara Menjalankan
1. Buka folder ini di VS Code
2. Klik kanan `index.html`, pilih **Open with Live Server** (Go Live)
3. Pastikan komputer terhubung ke internet (React dimuat dari CDN)

## Struktur Folder
```
index.html
css/style.css
js/
├── setup.js
├── main.js
├── App.js
├── components/   (BookForm, BookFilter, BookList)
├── pages/        (Home, Stats)
├── hooks/        (useLocalStorage, useBookStats)
└── context/      (BookContext)
```

## Fitur React yang Digunakan
| Fitur | Dipakai di |
| --- | --- |
| `useState` | `BookForm`, `Home` |
| `useEffect` | `BookForm` (isi form saat edit), `useLocalStorage` |
| Komponen reusable | `BookForm`, `BookFilter`, `BookList` |
| Context API | `js/context/BookContext.js` |
| React Router | `App.js` (halaman `#/` dan `#/stats`) |
| Custom hooks | `useLocalStorage`, `useBookStats` |
| PropTypes | semua komponen |

## Screenshot
(./screenshot/Screenshot1.png)
(./screenshot/Screenshot2.png)
(./screenshot/Screenshot3.png)
