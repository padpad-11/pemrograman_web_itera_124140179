// js/modules/weatherApi.js
// Modul khusus untuk komunikasi dengan API publik Open-Meteo (tanpa API key)

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const MAX_ATTEMPTS = 2;

/**
 * Mengambil data cuaca real-time untuk koordinat tertentu.
 * Menggunakan async/await + fetch() sesuai syarat Fungsi Asinkron.
 * Akan mencoba ulang (retry) sampai MAX_ATTEMPTS kali jika request gagal,
 * misalnya karena koneksi internet sedang tidak stabil.
 *
 * @param {{latitude: number, longitude: number}} coords - destructuring parameter
 * @returns {Promise<object>} objek current_weather dari Open-Meteo
 */
export const fetchCurrentWeather = async ({ latitude, longitude }) => {
  const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  let attempt = 0;
  let lastError = null;

  while (attempt < MAX_ATTEMPTS) {
    attempt += 1;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Gagal mengambil data cuaca (status ${response.status})`);
      }

      const data = await response.json();
      return data.current_weather;
    } catch (error) {
      lastError = error;
      console.warn(`Percobaan ke-${attempt} gagal:`, error.message);
    }
  }

  throw lastError;
};
