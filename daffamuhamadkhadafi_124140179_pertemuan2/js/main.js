// js/main.js
// Entry point: menghubungkan WeatherDashboardApp dengan elemen DOM & event pengguna

import { WeatherDashboardApp } from "./classes/WeatherDashboardApp.js";
import { LOCATION_PRESETS } from "./modules/locationPresets.js";

const app = new WeatherDashboardApp({
  gridSelector: "#locationGrid",
  emptyStateSelector: "#emptyState",
  statusSelector: "#statusMessage",
});

const form = document.getElementById("locationForm");
const idInput = document.getElementById("locationId");
const nameInput = document.getElementById("locationName");
const latInput = document.getElementById("locationLat");
const lonInput = document.getElementById("locationLon");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const refreshAllBtn = document.getElementById("refreshAllBtn");
const grid = document.getElementById("locationGrid");
const presetSelect = document.getElementById("presetLocation");

// Mengisi dropdown preset dari daftar lokasi di js/modules/locationPresets.js
LOCATION_PRESETS.forEach(({ name, latitude, longitude }, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = name;
  option.dataset.lat = latitude;
  option.dataset.lon = longitude;
  presetSelect.appendChild(option);
});

// Saat preset dipilih, otomatis isi form (nama, latitude, longitude)
presetSelect.addEventListener("change", (event) => {
  const selectedIndex = event.target.value;
  if (selectedIndex === "") return;

  const preset = LOCATION_PRESETS[selectedIndex];
  nameInput.value = preset.name;
  latInput.value = preset.latitude;
  lonInput.value = preset.longitude;
});

// Arrow function: mengembalikan form ke mode "tambah" setelah submit/batal
const resetForm = () => {
  form.reset();
  idInput.value = "";
  presetSelect.value = "";
  formTitle.textContent = "Tambah Lokasi Baru";
  submitBtn.textContent = "Tambah Lokasi";
  cancelEditBtn.classList.add("hidden");
};

// Arrow function: mengisi form dengan data lokasi yang akan diedit
const fillFormForEdit = (location) => {
  idInput.value = location.id;
  nameInput.value = location.name;
  latInput.value = location.latitude;
  lonInput.value = location.longitude;
  formTitle.textContent = `Edit Lokasi: ${location.name}`;
  submitBtn.textContent = "Simpan Perubahan";
  cancelEditBtn.classList.remove("hidden");
  nameInput.focus();
};

// Submit form: menambah lokasi baru atau menyimpan hasil edit (destructuring payload)
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = {
    name: nameInput.value.trim(),
    latitude: latInput.value,
    longitude: lonInput.value,
  };

  const editingId = idInput.value;

  if (editingId) {
    app.updateLocationInfo(editingId, payload);
  } else {
    app.addLocation(payload);
  }

  resetForm();
});

cancelEditBtn.addEventListener("click", resetForm);

refreshAllBtn.addEventListener("click", () => app.refreshAllWeather());

// Event delegation untuk tombol refresh/edit/hapus pada tiap kartu cuaca
grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === "delete") {
    const confirmed = confirm("Hapus lokasi ini dari dashboard?");
    if (confirmed) app.deleteLocation(id);
  }

  if (action === "refresh") {
    app.refreshLocationWeather(id);
  }

  if (action === "edit") {
    const location = app.getLocationById(id);
    if (location) fillFormForEdit(location);
  }
});

app.init();
