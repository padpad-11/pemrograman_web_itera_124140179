// ===== Konfigurasi =====
const STORAGE_KEY = "kasir_keranjang";
const MIN_HARGA = 500;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 0.1;

// ===== State =====
let keranjang = muatKeranjang();

// ===== Elemen DOM =====
const form = document.getElementById("form-barang");
const inputNama = document.getElementById("nama");
const inputHarga = document.getElementById("harga");
const inputQty = document.getElementById("qty");
const inputBayar = document.getElementById("bayar");
const isiKeranjang = document.getElementById("isi-keranjang");

// ===== Helper =====
function formatRupiah(angka) {
  return "Rp " + Math.round(angka).toLocaleString("id-ID");
}

// ===== LocalStorage =====
function simpanKeranjang() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

function muatKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

// ===== Validasi =====
function tampilkanError(input, idError, pesan) {
  document.getElementById(idError).textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

function validasiForm() {
  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseFloat(inputQty.value);
  let valid = true;

  if (nama.length < 3) {
    tampilkanError(inputNama, "err-nama", "Nama barang wajib diisi, minimal 3 karakter.");
    valid = false;
  } else {
    tampilkanError(inputNama, "err-nama", "");
  }

  if (isNaN(harga) || harga < MIN_HARGA) {
    tampilkanError(inputHarga, "err-harga", "Harga harus berupa angka, minimal Rp 500.");
    valid = false;
  } else {
    tampilkanError(inputHarga, "err-harga", "");
  }

  if (isNaN(qty) || !Number.isInteger(qty) || qty < 1) {
    tampilkanError(inputQty, "err-qty", "Jumlah harus bilangan bulat, minimal 1.");
    valid = false;
  } else {
    tampilkanError(inputQty, "err-qty", "");
  }

  return valid ? { nama, harga, qty } : null;
}

// ===== Perhitungan =====
function hitungTotal() {
  const total = keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);
  const diskon = total >= BATAS_DISKON ? total * PERSEN_DISKON : 0;
  return { total, diskon, totalAkhir: total - diskon };
}

function hitungKembalian() {
  const { totalAkhir } = hitungTotal();
  const el = document.getElementById("kembalian");
  el.className = "kembalian";

  if (inputBayar.value === "") {
    el.textContent = "";
    return;
  }
  const bayar = parseFloat(inputBayar.value);
  if (isNaN(bayar) || totalAkhir === 0) {
    el.textContent = "";
    return;
  }
  if (bayar < totalAkhir) {
    el.textContent = "Uang belum mencukupi, kurang " + formatRupiah(totalAkhir - bayar) + ".";
    el.classList.add("kurang");
  } else {
    el.textContent = "Kembalian: " + formatRupiah(bayar - totalAkhir);
    el.classList.add("ok");
  }
}

// ===== Render =====
function render() {
  isiKeranjang.innerHTML = "";

  keranjang.forEach((item, index) => {
    const tr = document.createElement("tr");
    const kolom = [
      index + 1,
      item.nama, // textContent: aman dari injeksi HTML
      formatRupiah(item.harga),
      item.qty,
      formatRupiah(item.harga * item.qty),
    ];
    kolom.forEach((nilai, i) => {
      const td = document.createElement("td");
      td.textContent = nilai;
      if (i >= 2) td.className = "num";
      tr.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-hapus";
    btn.textContent = "Hapus";
    btn.addEventListener("click", () => hapusItem(index));
    tdAksi.appendChild(btn);
    tr.appendChild(tdAksi);

    isiKeranjang.appendChild(tr);
  });

  document.getElementById("kosong").style.display = keranjang.length ? "none" : "block";

  const { total, diskon, totalAkhir } = hitungTotal();
  document.getElementById("total").textContent = formatRupiah(total);
  document.getElementById("diskon").textContent = "- " + formatRupiah(diskon);
  document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);
  hitungKembalian();
}

// ===== Aksi =====
function tambahItem(event) {
  event.preventDefault();
  const data = validasiForm();
  if (!data) return;

  keranjang.push(data);
  simpanKeranjang();
  form.reset();
  inputNama.focus();
  render();
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  render();
}

function resetTransaksi() {
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  inputBayar.value = "";
  render();
}

// ===== Event listener =====
form.addEventListener("submit", tambahItem);
inputBayar.addEventListener("input", hitungKembalian);
document.getElementById("btn-reset").addEventListener("click", resetTransaksi);

// Tampilkan data yang tersimpan saat halaman dibuka
render();
