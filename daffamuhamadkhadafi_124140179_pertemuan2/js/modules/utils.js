// js/modules/utils.js
// Kumpulan fungsi utilitas (memanfaatkan arrow function & template literals)

// Ikon cuaca resmi yang direkomendasikan Open-Meteo: "Meteocons"
// (https://github.com/basmilius/meteocons), disajikan lewat CDN jsDelivr.
const ICON_BASE_URL = "https://cdn.jsdelivr.net/npm/@meteocons/svg@0.1.0/fill";

// Pemetaan kode cuaca WMO (dipakai Open-Meteo) menjadi deskripsi + slug ikon.
// Beberapa kondisi punya varian siang (day) & malam (night) tersendiri.
const WEATHER_CODE_MAP = {
  0: { label: "Cerah", day: "clear-day", night: "clear-night" },
  1: { label: "Cerah Berawan", day: "mostly-clear-day", night: "mostly-clear-night" },
  2: { label: "Berawan Sebagian", day: "partly-cloudy-day", night: "partly-cloudy-night" },
  3: { label: "Berawan Penuh", day: "overcast", night: "overcast" },
  45: { label: "Berkabut", day: "fog", night: "fog" },
  48: { label: "Kabut Beku", day: "fog", night: "fog" },
  51: { label: "Gerimis Ringan", day: "drizzle", night: "drizzle" },
  53: { label: "Gerimis Sedang", day: "drizzle", night: "drizzle" },
  55: { label: "Gerimis Lebat", day: "drizzle", night: "drizzle" },
  56: { label: "Gerimis Beku Ringan", day: "sleet", night: "sleet" },
  57: { label: "Gerimis Beku Lebat", day: "sleet", night: "sleet" },
  61: { label: "Hujan Ringan", day: "rain", night: "rain" },
  63: { label: "Hujan Sedang", day: "rain", night: "rain" },
  65: { label: "Hujan Lebat", day: "rain", night: "rain" },
  66: { label: "Hujan Beku Ringan", day: "sleet", night: "sleet" },
  67: { label: "Hujan Beku Lebat", day: "sleet", night: "sleet" },
  71: { label: "Salju Ringan", day: "snow", night: "snow" },
  73: { label: "Salju Sedang", day: "snow", night: "snow" },
  75: { label: "Salju Lebat", day: "snow", night: "snow" },
  77: { label: "Butiran Salju", day: "snow", night: "snow" },
  80: { label: "Hujan Lokal Ringan", day: "rain", night: "rain" },
  81: { label: "Hujan Lokal Sedang", day: "rain", night: "rain" },
  82: { label: "Hujan Lokal Lebat", day: "rain", night: "rain" },
  85: { label: "Hujan Salju Ringan", day: "snow", night: "snow" },
  86: { label: "Hujan Salju Lebat", day: "snow", night: "snow" },
  95: { label: "Badai Petir", day: "thunderstorms", night: "thunderstorms" },
  96: { label: "Badai Petir + Hujan Es Ringan", day: "thunderstorms-hail", night: "thunderstorms-hail" },
  99: { label: "Badai Petir + Hujan Es Lebat", day: "thunderstorms-hail", night: "thunderstorms-hail" },
};

const FALLBACK_WEATHER = { label: "Tidak Diketahui", day: "not-available", night: "not-available" };

// Arrow function #1: menerjemahkan weathercode + status siang/malam Open-Meteo
// menjadi label bahasa Indonesia dan URL ikon SVG dari Meteocons.
export const describeWeatherCode = (code, isDay = 1) => {
  const entry = WEATHER_CODE_MAP[code] ?? FALLBACK_WEATHER;
  const slug = isDay ? entry.day : entry.night;
  return { label: entry.label, iconUrl: `${ICON_BASE_URL}/${slug}.svg` };
};

// Arrow function #2: memformat ISO datetime menjadi format waktu lokal Indonesia
export const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Arrow function #3: membuat id unik sederhana untuk setiap lokasi baru
export const generateId = () =>
  `loc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// Arrow function #4: membulatkan & memformat koordinat untuk ditampilkan
export const formatCoordinate = (value) => Number(value).toFixed(2);
