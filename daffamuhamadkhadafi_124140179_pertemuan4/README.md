# Praktikum Pemrograman Web - Pertemuan 4: Python Dasar

## Identitas Mahasiswa
- **Nama** : Daffa Muhamad Khadafi
- **NIM**  : 124140179
- **Prodi**: Teknik Informatika, Institut Teknologi Sumatera (ITERA)

## Struktur Folder
```
daffamuhamadkhadafi_124140179_pertemuan4/
├── .gitignore
├── README.md
├── tugas1_bmi.py
├── tugas2_nilai_mahasiswa.py
├── math_operations.py
└── main.py
```

## Deskripsi Program

### Soal 1 - `tugas1_bmi.py` (Penghitung BMI)
Meminta input berat (kg) dan tinggi (m) lewat `input()` (dengan validasi angka positif), menghitung
`BMI = berat / (tinggi * tinggi)` pada fungsi `hitung_bmi()`, lalu `tentukan_kategori()` memakai
`if-elif-else` untuk 4 kategori (kurang < 18.5, normal 18.5-24.9, berlebih 25-29.9, obesitas >= 30).
Hasil dicetak dengan f-string 2 angka desimal.

### Soal 2 - `tugas2_nilai_mahasiswa.py` (Pengelolaan Nilai Mahasiswa)
Berisi list 6 dictionary mahasiswa (`nama`, `nim`, `nilai_uts`, `nilai_uas`, `nilai_tugas`).
`hitung_nilai_akhir()` memakai bobot 30% UTS + 40% UAS + 30% Tugas, `tentukan_grade()` menentukan
grade A-E, `cetak_tabel()` menampilkan tabel rapi, dan `max()`/`min()` mencari mahasiswa dengan
nilai akhir tertinggi dan terendah.

### Soal 3 - `math_operations.py` & `main.py`
- `math_operations.py`: konstanta `PI`, luas & keliling persegi, persegi panjang, lingkaran, serta
  konversi suhu Celsius ke Fahrenheit dan Celsius ke Kelvin. Setiap fungsi punya docstring.
- `main.py`: menguji semua fungsi dengan berbagai nilai input memakai dua cara impor:
  `import math_operations as mo` dan `from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin, PI`.

## Cara Menjalankan
Buka terminal di folder ini (VS Code), lalu jalankan:
```bash
python tugas1_bmi.py
python tugas2_nilai_mahasiswa.py
python main.py
```
(Gunakan `python3` jika `python` tidak dikenali.)


### Soal 1
```
=== PENGHITUNG BMI ===
Masukkan berat badan (kg)  : Masukkan tinggi badan (m)  : 
--- HASIL ---
Berat badan : 60.00 kg
Tinggi badan: 1.65 m
Nilai BMI   : 22.04
Kategori    : Berat badan normal
```

### Soal 2
```
=== DATA NILAI MAHASISWA ===
+-----+----------------------+------------+-------------+-------+
| No  | Nama                 | NIM        | Nilai Akhir | Grade |
+-----+----------------------+------------+-------------+-------+
| 1   | Ahmad Fadhilah       | 121140001  | 87.90       | A     |
| 2   | Siti Aminah          | 121140002  | 75.60       | B     |
| 3   | Budi Santoso         | 121140003  | 64.50       | C     |
| 4   | Dewi Lestari         | 121140004  | 55.30       | D     |
| 5   | Rian Pratama         | 121140005  | 45.00       | E     |
| 6   | Eko Wijaya           | 121140006  | 78.70       | B     |
+-----+----------------------+------------+-------------+-------+

Mahasiswa dengan Nilai Akhir TERTINGGI:
  Nama        : Ahmad Fadhilah
  NIM         : 121140001
  Nilai Akhir : 87.90
  Grade       : A

Mahasiswa dengan Nilai Akhir TERENDAH:
  Nama        : Rian Pratama
  NIM         : 121140005
  Nilai Akhir : 45.00
  Grade       : E
```

### Soal 3
```

============================================
PERSEGI
============================================
Sisi 4     -> Luas:    16.00 | Keliling:    16.00
Sisi 7.5   -> Luas:    56.25 | Keliling:    30.00
Sisi 10    -> Luas:   100.00 | Keliling:    40.00

============================================
PERSEGI PANJANG
============================================
P=5    L=3    -> Luas:    15.00 | Keliling:    16.00
P=10   L=4.5  -> Luas:    45.00 | Keliling:    29.00
P=12   L=8    -> Luas:    96.00 | Keliling:    40.00

============================================
LINGKARAN
============================================
Konstanta PI = 3.14159
r=3     -> Luas:    28.27 | Keliling:    18.85
r=7     -> Luas:   153.94 | Keliling:    43.98
r=10.5  -> Luas:   346.36 | Keliling:    65.97

============================================
KONVERSI SUHU
============================================
  0.0 C ->   32.00 F |  273.15 K
 37.0 C ->   98.60 F |  310.15 K
100.0 C ->  212.00 F |  373.15 K
-40.0 C ->  -40.00 F |  233.15 K
```
