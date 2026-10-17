// js/classes/LocationItem.js
// Class untuk memodelkan satu lokasi cuaca yang disimpan pengguna

import { generateId } from "../modules/utils.js";

export class LocationItem {
  constructor({ id, name, latitude, longitude, weather = null, updatedAt = null }) {
    this.id = id ?? generateId();
    this.name = name;
    this.latitude = Number(latitude);
    this.longitude = Number(longitude);
    this.weather = weather; // { temperature, windspeed, weathercode, time }
    this.updatedAt = updatedAt;
  }

  // Mengembalikan salinan item dengan data cuaca terbaru (immutable update)
  withWeather(weather) {
    return new LocationItem({
      ...this,
      weather,
      updatedAt: new Date().toISOString(),
    });
  }

  // Serialisasi object biasa agar aman disimpan di localStorage
  toJSON() {
    const { id, name, latitude, longitude, weather, updatedAt } = this;
    return { id, name, latitude, longitude, weather, updatedAt };
  }
}
