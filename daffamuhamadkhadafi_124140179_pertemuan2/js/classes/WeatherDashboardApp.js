// js/classes/WeatherDashboardApp.js
// Class utama: mengelola state, localStorage, dan pemanggilan API cuaca

import { LocationItem } from "./LocationItem.js";
import { fetchCurrentWeather } from "../modules/weatherApi.js";
import { describeWeatherCode, formatDateTime, formatCoordinate } from "../modules/utils.js";

const STORAGE_KEY = "paw-dashboard-cuaca-lokasi";

// Lokasi default: Kampus ITERA, Lampung Selatan (sesuai contoh pada modul)
const DEFAULT_LOCATIONS = [
  { name: "ITERA, Lampung Selatan", latitude: -5.36, longitude: 105.31 },
];

export class WeatherDashboardApp {
  constructor({ gridSelector, emptyStateSelector, statusSelector }) {
    this.gridEl = document.querySelector(gridSelector);
    this.emptyStateEl = document.querySelector(emptyStateSelector);
    this.statusEl = document.querySelector(statusSelector);
    this.locations = this.loadFromStorage();
  }

  // --- Penyimpanan Lokal (localStorage) ---

  loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_LOCATIONS.map((loc) => new LocationItem(loc));
    }
    try {
      const parsed = JSON.parse(raw);
      return parsed.map((loc) => new LocationItem(loc));
    } catch (error) {
      console.error("Gagal membaca localStorage, memakai data default:", error);
      return DEFAULT_LOCATIONS.map((loc) => new LocationItem(loc));
    }
  }

  saveToStorage() {
    const serialized = this.locations.map((loc) => loc.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  }

  // --- Operasi CRUD (state selalu diperbarui secara immutable dengan spread) ---

  addLocation({ name, latitude, longitude }) {
    const newLocation = new LocationItem({ name, latitude, longitude });
    this.locations = [...this.locations, newLocation];
    this.saveToStorage();
    this.render();
    this.refreshLocationWeather(newLocation.id);
  }

  updateLocationInfo(id, { name, latitude, longitude }) {
    this.locations = this.locations.map((loc) =>
      loc.id === id ? new LocationItem({ ...loc, name, latitude, longitude }) : loc
    );
    this.saveToStorage();
    this.render();
    this.refreshLocationWeather(id);
  }

  deleteLocation(id) {
    this.locations = this.locations.filter((loc) => loc.id !== id);
    this.saveToStorage();
    this.render();
  }

  getLocationById(id) {
    return this.locations.find((loc) => loc.id === id);
  }

  // --- Operasi Asinkron (async/await) ---

  async refreshLocationWeather(id) {
    const target = this.getLocationById(id);
    if (!target) return;

    this.setCardLoading(id, true);
    this.setStatus(`Mengambil data cuaca untuk ${target.name}...`);

    try {
      const weather = await fetchCurrentWeather({
        latitude: target.latitude,
        longitude: target.longitude,
      });

      this.locations = this.locations.map((loc) =>
        loc.id === id ? loc.withWeather(weather) : loc
      );
      this.saveToStorage();
      this.setStatus(`Cuaca ${target.name} berhasil diperbarui.`);
    } catch (error) {
      console.error(error);
      this.setStatus(`Gagal mengambil cuaca untuk ${target.name}: ${error.message}`);
    } finally {
      this.render();
    }
  }

  async refreshAllWeather() {
    this.setStatus("Memperbarui seluruh data cuaca...");
    const tasks = this.locations.map(({ id }) => this.refreshLocationWeather(id));
    await Promise.all(tasks);
    this.setStatus("Semua data cuaca sudah yang terbaru.");
  }

  // --- Rendering ke DOM ---

  setStatus(message) {
    if (this.statusEl) this.statusEl.textContent = message;
  }

  setCardLoading(id, isLoading) {
    const card = this.gridEl?.querySelector(`[data-id="${id}"]`);
    const indicator = card?.querySelector(".loading-indicator");
    if (indicator) indicator.classList.toggle("hidden", !isLoading);
  }

  renderCard(location) {
    const { id, name, latitude, longitude, weather, updatedAt } = location;
    const { label, iconUrl } = describeWeatherCode(weather?.weathercode, weather?.is_day);

    return `
      <article class="weather-card bg-white rounded-lg shadow-md p-5" data-id="${id}">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="font-bold text-gray-800">${name}</h3>
            <p class="text-xs text-gray-400">
              ${formatCoordinate(latitude)}, ${formatCoordinate(longitude)}
            </p>
          </div>
          <span class="loading-indicator hidden loading-spinner" title="Memuat..."></span>
        </div>

        ${weather
          ? `
            <div class="flex items-center gap-3 mb-2">
              <img src="${iconUrl}" alt="${label}" class="w-16 h-16" loading="lazy">
              <div>
                <p class="text-2xl font-semibold text-blue-600">${weather.temperature}°C</p>
                <p class="text-sm text-gray-500">${label}</p>
              </div>
            </div>
            <p class="text-xs text-gray-400 mb-1">💨 Angin: ${weather.windspeed} km/jam</p>
            <p class="text-xs text-gray-400">🕒 Diperbarui: ${formatDateTime(updatedAt)}</p>
          `
          : `<p class="text-sm text-gray-400 italic">Belum ada data cuaca.</p>`
        }

        <div class="card-actions flex gap-2 mt-4">
          <button data-action="refresh" data-id="${id}"
            class="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1.5 rounded font-medium">
            🔄 Refresh
          </button>
          <button data-action="edit" data-id="${id}"
            class="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded font-medium">
            ✏️ Edit
          </button>
          <button data-action="delete" data-id="${id}"
            class="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded font-medium">
            🗑️ Hapus
          </button>
        </div>
      </article>
    `;
  }

  render() {
    if (!this.gridEl) return;

    this.gridEl.innerHTML = this.locations.map((loc) => this.renderCard(loc)).join("");
    this.emptyStateEl?.classList.toggle("hidden", this.locations.length > 0);
  }

  init() {
    this.render();
    this.refreshAllWeather();
  }
}
