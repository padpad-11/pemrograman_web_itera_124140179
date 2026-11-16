"""Modul berisi class Library untuk mengelola koleksi item perpustakaan."""

from library_item import LibraryItem


class Library:
    """Menyimpan dan mengelola koleksi LibraryItem."""

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []  # private: hanya diakses lewat method

    def tambah_item(self, item):
        """Menambahkan item ke koleksi. Menolak ID duplikat."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan dari LibraryItem")
        if self.cari_by_id(item.item_id) is not None:
            print(f"Gagal: ID '{item.item_id}' sudah ada.")
            return False
        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_tersedia(self):
        """Menampilkan item yang tersedia (tidak sedang dipinjam)."""
        print(f"\n=== Katalog Tersedia - {self.nama} ===")
        tersedia = [i for i in self.__koleksi if not i.is_dipinjam]
        if not tersedia:
            print("(kosong)")
        for item in tersedia:
            print(item)  # polymorphism: get_detail() berbeda per subclass
        return tersedia

    def tampilkan_semua(self):
        """Menampilkan seluruh item beserta statusnya."""
        print(f"\n=== Semua Koleksi - {self.nama} ===")
        for item in self.__koleksi:
            print(item)

    def cari_by_id(self, item_id):
        """Mencari item berdasarkan ID. Mengembalikan None jika tidak ada."""
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_by_judul(self, kata_kunci):
        """Mencari item yang judulnya mengandung kata kunci (case-insensitive)."""
        kata_kunci = kata_kunci.lower()
        return [i for i in self.__koleksi if kata_kunci in i.judul.lower()]

    def __len__(self):
        return len(self.__koleksi)
