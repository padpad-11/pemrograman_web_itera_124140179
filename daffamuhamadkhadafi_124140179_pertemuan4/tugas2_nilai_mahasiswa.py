"""
Berkas: tugas2_nilai_mahasiswa.py
Deskripsi: Pengelolaan data nilai mahasiswa (nilai akhir, grade, tabel,
           serta mahasiswa dengan nilai tertinggi dan terendah).
"""

BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

data_mahasiswa = [
    {"nama": "Ahmad Fadhilah", "nim": "121140001",
     "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Siti Aminah", "nim": "121140002",
     "nilai_uts": 72, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Budi Santoso", "nim": "121140003",
     "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Dewi Lestari", "nim": "121140004",
     "nilai_uts": 55, "nilai_uas": 52, "nilai_tugas": 60},
    {"nama": "Rian Pratama", "nim": "121140005",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Eko Wijaya", "nim": "121140006",
     "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir berbobot.

    Parameter:
        uts (float)   : nilai UTS (bobot 30%).
        uas (float)   : nilai UAS (bobot 40%).
        tugas (float) : nilai tugas (bobot 30%).

    Return:
        float: nilai akhir = 30% UTS + 40% UAS + 30% Tugas.
    """
    return (BOBOT_UTS * uts) + (BOBOT_UAS * uas) + (BOBOT_TUGAS * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade berdasarkan nilai akhir.

    Parameter:
        nilai_akhir (float): nilai akhir mahasiswa.

    Return:
        str: grade A, B, C, D, atau E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar: list) -> list:
    """
    Menambahkan kunci nilai_akhir dan grade ke setiap dictionary mahasiswa.

    Parameter:
        daftar (list): list dictionary data mahasiswa.

    Return:
        list: list dictionary baru yang sudah memuat nilai_akhir dan grade.
    """
    hasil = []
    for mhs in daftar:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        data_baru = dict(mhs)
        data_baru["nilai_akhir"] = nilai_akhir
        data_baru["grade"] = tentukan_grade(nilai_akhir)
        hasil.append(data_baru)
    return hasil


def cetak_tabel(daftar: list) -> None:
    """
    Mencetak tabel data mahasiswa (Nama, NIM, Nilai Akhir, Grade).

    Parameter:
        daftar (list): list dictionary mahasiswa yang sudah diproses.

    Return:
        None
    """
    garis = "+" + "-" * 5 + "+" + "-" * 22 + "+" + "-" * 12 + "+" + "-" * 13 + "+" + "-" * 7 + "+"
    print(garis)
    print(f"| {'No':<3} | {'Nama':<20} | {'NIM':<10} | {'Nilai Akhir':<11} | {'Grade':<5} |")
    print(garis)
    for no, mhs in enumerate(daftar, start=1):
        print(
            f"| {no:<3} | {mhs['nama']:<20} | {mhs['nim']:<10} | "
            f"{mhs['nilai_akhir']:<11.2f} | {mhs['grade']:<5} |"
        )
    print(garis)


def cetak_info(judul: str, mhs: dict) -> None:
    """
    Mencetak informasi singkat satu mahasiswa.

    Parameter:
        judul (str): label yang ditampilkan (mis. "Nilai Tertinggi").
        mhs (dict) : data mahasiswa yang sudah diproses.

    Return:
        None
    """
    print(f"{judul}")
    print(f"  Nama        : {mhs['nama']}")
    print(f"  NIM         : {mhs['nim']}")
    print(f"  Nilai Akhir : {mhs['nilai_akhir']:.2f}")
    print(f"  Grade       : {mhs['grade']}")


def main():
    data_akhir = proses_data(data_mahasiswa)

    print("=== DATA NILAI MAHASISWA ===")
    cetak_tabel(data_akhir)

    tertinggi = max(data_akhir, key=lambda m: m["nilai_akhir"])
    terendah = min(data_akhir, key=lambda m: m["nilai_akhir"])

    print()
    cetak_info("Mahasiswa dengan Nilai Akhir TERTINGGI:", tertinggi)
    print()
    cetak_info("Mahasiswa dengan Nilai Akhir TERENDAH:", terendah)


if __name__ == "__main__":
    main()
