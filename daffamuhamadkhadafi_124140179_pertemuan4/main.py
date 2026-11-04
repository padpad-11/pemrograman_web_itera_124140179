"""
Berkas: main.py
Deskripsi: Program utama untuk menguji modul math_operations.
Menggunakan dua cara impor berbeda:
  1. import math_operations as mo      (impor seluruh modul + alias)
  2. from math_operations import ...   (impor fungsi/konstanta spesifik)
"""

import math_operations as mo
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI


def garis(judul: str) -> None:
    """
    Mencetak judul bagian dengan garis pemisah.

    Parameter:
        judul (str): teks judul.

    Return:
        None
    """
    print(f"\n{'=' * 44}\n{judul}\n{'=' * 44}")


def uji_persegi() -> None:
    """Menguji luas dan keliling persegi dengan beberapa nilai sisi."""
    garis("PERSEGI")
    for sisi in (4, 7.5, 10):
        print(f"Sisi {sisi:<5} -> Luas: {mo.luas_persegi(sisi):>8.2f} | "
              f"Keliling: {mo.keliling_persegi(sisi):>8.2f}")


def uji_persegi_panjang() -> None:
    """Menguji luas dan keliling persegi panjang dengan beberapa nilai."""
    garis("PERSEGI PANJANG")
    for p, l in ((5, 3), (10, 4.5), (12, 8)):
        print(f"P={p:<4} L={l:<4} -> Luas: {mo.luas_persegi_panjang(p, l):>8.2f} | "
              f"Keliling: {mo.keliling_persegi_panjang(p, l):>8.2f}")


def uji_lingkaran() -> None:
    """Menguji luas dan keliling lingkaran dengan beberapa jari-jari."""
    garis("LINGKARAN")
    print(f"Konstanta PI = {PI}")
    for r in (3, 7, 10.5):
        print(f"r={r:<5} -> Luas: {mo.luas_lingkaran(r):>8.2f} | "
              f"Keliling: {mo.keliling_lingkaran(r):>8.2f}")


def uji_suhu() -> None:
    """Menguji konversi suhu Celsius ke Fahrenheit dan Kelvin."""
    garis("KONVERSI SUHU")
    for c in (0, 37, 100, -40):
        print(f"{c:>5.1f} C -> {celsius_ke_fahrenheit(c):>7.2f} F | "
              f"{celsius_ke_kelvin(c):>7.2f} K")


def main() -> None:
    """Menjalankan seluruh pengujian modul math_operations."""
    uji_persegi()
    uji_persegi_panjang()
    uji_lingkaran()
    uji_suhu()


if __name__ == "__main__":
    main()
