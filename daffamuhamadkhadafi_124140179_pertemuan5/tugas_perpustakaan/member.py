"""Modul berisi class Member (anggota perpustakaan)."""


class Member:
    """Anggota perpustakaan yang dapat meminjam item."""

    def __init__(self, nama, member_id):
        self.nama = nama
        self._member_id = member_id
        self.__daftar_pinjam = []

    @property
    def member_id(self):
        """ID anggota (read-only)."""
        return self._member_id

    @property
    def daftar_pinjam(self):
        """Salinan daftar item yang sedang dipinjam."""
        return list(self.__daftar_pinjam)

    def pinjam(self, item):
        """Meminjam sebuah item. Mengembalikan True jika berhasil."""
        if item.pinjam():
            self.__daftar_pinjam.append(item)
            return True
        return False

    def kembalikan(self, item):
        """Mengembalikan sebuah item. Mengembalikan True jika berhasil."""
        if item in self.__daftar_pinjam and item.kembalikan():
            self.__daftar_pinjam.remove(item)
            return True
        return False

    def __str__(self):
        return f"Member {self._member_id}: {self.nama} ({len(self.__daftar_pinjam)} pinjaman)"
