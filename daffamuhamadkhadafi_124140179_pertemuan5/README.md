# Tugas Pertemuan 5 - Sistem Manajemen Perpustakaan Sederhana

## Identitas Mahasiswa
- Nama Lengkap : DAFFA MUHAMAD KHADAFI
- NIM          : 124140179
- Kelas        : RB

## Deskripsi Program
Program mengelola koleksi perpustakaan (buku dan majalah). `main.py`
menambahkan item, menampilkan katalog tersedia, mencari item berdasarkan
judul/id, meminjam dan mengembalikan item, serta menghitung denda.

Penerapan 4 pilar OOP:
- **Class**: `LibraryItem`, `Book`, `Magazine`, `Library`, `Member`.
- **Inheritance**: `Book` dan `Magazine` mewarisi abstract class `LibraryItem`.
- **Encapsulation**: atribut protected (`_judul`, `_item_id`), private
  (`__dipinjam`, `__koleksi`, `__daftar_pinjam`), dan `@property`
  (`is_dipinjam`, `judul`, `item_id`).
- **Polymorphism**: `get_detail()` dan `hitung_denda()` diimplementasikan
  berbeda di tiap subclass, dipanggil seragam lewat tipe `LibraryItem`.

## Menjalankan Program
```bash
cd tugas_perpustakaan
python main.py
```

## Screenshot Output
(./tugas_perpustakaan/ss/code.png)
