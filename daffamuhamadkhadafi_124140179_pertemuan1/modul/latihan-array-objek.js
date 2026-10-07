// LATIHAN ARRAY & OBJEK
// Nama: DAFFA MUHAMAD KHADAFI
// NIM: 124140179
// Kelas: RB

// 1. Data Mahasiswa
const mahasiswa = [
  {
    nama: "DAFFA",
    nim: "124140179",
    jurusan: "Teknik Informatika",
    nilai: 85,
  },
  {
    nama: "CINTORO",
    nim: "124140061",
    jurusan: "Teknik Informatika",
    nilai: 78,
  },
  {
    nama: "REKSA",
    nim: "124140065",
    jurusan: "Teknik Informatika",
    nilai: 92,
  },
  {
    nama: "RAKHA",
    nim: "124140210",
    jurusan: "Teknik Informatika",
    nilai: 88,
  },
  {
    nama: "DANY",
    nim: "124140087",
    jurusan: "Teknik Informatika",
    nilai: 75,
  },
];

console.log("Data Mahasiswa:");
mahasiswa.forEach(function (mhs) {
  console.log(
    mhs.nama + " - " + mhs.nim + " - " + mhs.jurusan + " - Nilai: " + mhs.nilai,
  );
});

// 2. Mencari Nilai Tertinggi
const mahasiswaTertinggi = mahasiswa.reduce(function (tertinggi, mhs) {
  if (mhs.nilai > tertinggi.nilai) {
    return mhs;
  }

  return tertinggi;
});

console.log(
  "Nilai tertinggi:",
  mahasiswaTertinggi.nama,
  mahasiswaTertinggi.nilai,
);

// 3. Menampilkan Mahasiswa dengan Nilai di Atas 80
const mahasiswaDiAtas80 = mahasiswa.filter(function (mhs) {
  return mhs.nilai > 80;
});

console.log("Mahasiswa dengan nilai di atas 80:");

mahasiswaDiAtas80.forEach(function (mhs) {
  console.log(mhs.nama + " - " + mhs.nilai);
});

// 4. Mengurutkan Mahasiswa Berdasarkan Nama
const urutNama = [...mahasiswa].sort(function (a, b) {
  return a.nama.localeCompare(b.nama);
});

console.log("Mahasiswa berdasarkan nama:");

urutNama.forEach(function (mhs) {
  console.log(mhs.nama);
});

// 5. Menambahkan Data Mahasiswa
mahasiswa.push({
  nama: "TEMOLA",
  nim: "124140098",
  jurusan: "Teknik Informatika",
  nilai: 82,
});

console.log("Setelah menambahkan mahasiswa:");

mahasiswa.forEach(function (mhs) {
  console.log(mhs.nama + " - " + mhs.nilai);
});

// 6. Mengubah Nilai Mahasiswa
const mahasiswaUbah = mahasiswa.find(function (mhs) {
  return mhs.nim === "124140098";
});

if (mahasiswaUbah) {
  mahasiswaUbah.nilai = 90;
}

console.log("Setelah mengubah nilai TEMOLA:", mahasiswaUbah);

// 7. Menghapus Data Mahasiswa
const indexHapus = mahasiswa.findIndex(function (mhs) {
  return mhs.nim === "124140098";
});

if (indexHapus !== -1) {
  mahasiswa.splice(indexHapus, 1);
}

console.log("Setelah menghapus data TEMOLA:");

mahasiswa.forEach(function (mhs) {
  console.log(mhs.nama + " - " + mhs.nilai);
});
