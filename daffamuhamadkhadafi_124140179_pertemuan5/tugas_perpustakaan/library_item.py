"""Modul berisi abstract class LibraryItem beserta subclass Book dan Magazine."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class dasar untuk semua item di perpustakaan.

    Atribut:
        _item_id (protected): ID unik item.
        _judul (protected): Judul item.
        __dipinjam (private): Status peminjaman, hanya diubah lewat method.
    """

    def __init__(self, item_id, judul):
        self._item_id = item_id
        self._judul = judul
        self.__dipinjam = False

    @property
    def item_id(self):
        """ID item (read-only)."""
        return self._item_id

    @property
    def judul(self):
        """Judul item (read-only)."""
        return self._judul

    @property
    def is_dipinjam(self):
        """Status peminjaman item (read-only dari luar class)."""
        return self.__dipinjam

    def pinjam(self):
        """Meminjam item. Mengembalikan True jika berhasil."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        """Mengembalikan item. Mengembalikan True jika berhasil."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Mengembalikan string detail item (wajib diimplementasikan subclass)."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda keterlambatan (wajib diimplementasikan subclass)."""

    def __str__(self):
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self._item_id}] {self.get_detail()} - {status}"


class Book(LibraryItem):
    """Item perpustakaan berupa buku."""

    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, penulis, jumlah_halaman):
        super().__init__(item_id, judul)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def get_detail(self):
        """Detail buku: judul, penulis, dan jumlah halaman."""
        return f"Buku: {self._judul} oleh {self._penulis} ({self._jumlah_halaman} hlm)"

    def hitung_denda(self, hari_terlambat):
        """Denda buku Rp1.000 per hari."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Item perpustakaan berupa majalah."""

    DENDA_PER_HARI = 500

    def __init__(self, item_id, judul, edisi, penerbit):
        super().__init__(item_id, judul)
        self._edisi = edisi
        self._penerbit = penerbit

    def get_detail(self):
        """Detail majalah: judul, edisi, dan penerbit."""
        return f"Majalah: {self._judul} edisi {self._edisi} ({self._penerbit})"

    def hitung_denda(self, hari_terlambat):
        """Denda majalah Rp500 per hari."""
        return max(0, hari_terlambat) * self.DENDA_PER_HARI
