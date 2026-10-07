# Kasir Kantin - Mini POS

## Identitas
- **Nama Lengkap:** Daffa Muhamad Khadafi
- **NIM:** 124140179
- **Kelas Praktikum:** RB

## Deskripsi Aplikasi
Aplikasi web kasir sederhana untuk kantin kampus. Kasir bisa memasukkan barang, melihat keranjang belanja, menghitung total dan diskon otomatis, lalu menghitung kembalian. Isi keranjang disimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh.

## Panduan Menjalankan
1. Clone repository ini atau download foldernya.
2. Buka folder di VS Code, klik kanan `index.html`, pilih **Open with Live Server**. (Bisa juga langsung buka `index.html` di browser.)
3. Aplikasi siap dipakai.

## Daftar Fitur
- [x] Validasi nama barang (wajib, minimal 3 karakter)
- [x] Validasi harga (angka, minimal Rp 500)
- [x] Validasi qty (bilangan bulat, minimal 1)
- [x] Pesan error merah di bawah input dan barang tidak masuk keranjang jika tidak valid
- [x] Form otomatis reset setelah barang berhasil ditambahkan
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Subtotal per baris dan total belanja otomatis
- [x] Diskon 10% jika total belanja minimal Rp 50.000
- [x] Kalkulator uang bayar dan kembalian (ada pesan jika uang kurang)
- [x] Hapus item dengan perhitungan ulang otomatis
- [x] Penyimpanan keranjang di `localStorage`
- [x] Tombol Transaksi baru untuk mengosongkan keranjang

## Tangkapan Layar
> Ganti dengan screenshot kamu (minimal 3).

| Tampilan | Gambar |
|---|---|
| Form input utama | `![form](screenshots/form.png)` |
| Validasi error muncul | `![error](screenshots/error.png)` |
| Hasil perhitungan dan tabel keranjang | `![hasil](screenshots/hasil.png)` |

## Penjelasan Teknis Singkat
- **Validasi input:** fungsi `validasiForm()` membaca ketiga input, mengecek aturan masing-masing (panjang nama, harga >= 500, qty bilangan bulat >= 1), lalu menampilkan pesan lewat `tampilkanError()`. Jika semua valid, fungsi mengembalikan objek barang, jika tidak mengembalikan `null` sehingga barang tidak ditambahkan.
- **Kalkulator:** `hitungTotal()` menjumlahkan `harga x qty` semua item dengan `reduce()`. Jika total >= Rp 50.000, diskon 10% dikurangkan. `hitungKembalian()` membandingkan uang bayar dengan total akhir setiap kali input berubah.
- **LocalStorage:** array `keranjang` diubah jadi string dengan `JSON.stringify()` saat disimpan, dan dikembalikan jadi array dengan `JSON.parse()` saat halaman dimuat. Setiap tambah, hapus, atau reset memanggil penyimpanan ulang lalu `render()`.
