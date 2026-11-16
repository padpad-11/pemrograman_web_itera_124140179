"""Skrip untuk menguji sistem manajemen perpustakaan."""

from library import Library
from library_item import Book, Magazine
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- Menambahkan item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Dasar Pemrograman Web", "Siti Aminah", 250))
    perpus.tambah_item(Magazine("M001", "Tech Today", "Edisi 12/2026", "Gramedia"))
    perpus.tambah_item(Magazine("M002", "Info Komputer", "Edisi 11/2026", "Kompas"))
    perpus.tambah_item(Book("B001", "Duplikat", "Anonim", 1))  # ditolak

    perpus.tampilkan_tersedia()

    print("\n--- Pencarian ---")
    item = perpus.cari_by_id("M001")
    print("Cari ID 'M001':", item)
    for hasil in perpus.cari_by_judul("pemrograman"):
        print("Cari judul 'pemrograman':", hasil)
    print("Cari ID 'X999':", perpus.cari_by_id("X999"))

    print("\n--- Peminjaman ---")
    anggota = Member("Andi", "A001")
    print("Pinjam B001:", anggota.pinjam(perpus.cari_by_id("B001")))
    print("Pinjam B001 lagi:", anggota.pinjam(perpus.cari_by_id("B001")))
    print(anggota)
    perpus.tampilkan_tersedia()

    print("\n--- Polymorphism: hitung denda 3 hari ---")
    for kode in ("B001", "M001"):
        it = perpus.cari_by_id(kode)
        print(f"{it.judul}: Rp{it.hitung_denda(3)}")

    print("\n--- Pengembalian ---")
    print("Kembalikan B001:", anggota.kembalikan(perpus.cari_by_id("B001")))
    perpus.tampilkan_semua()

    # Encapsulation: status tidak bisa diubah langsung
    try:
        perpus.cari_by_id("B001").is_dipinjam = True
    except AttributeError as e:
        print("\nEncapsulation aktif:", e)


if __name__ == "__main__":
    main()
