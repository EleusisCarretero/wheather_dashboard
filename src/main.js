import { fetchWeatherByCoords, fetchCoordByCityName } from "./utils/api.js";

const app = document.getElementById("app");

async function renderWeather(city) {
  const coor_arr = await fetchCoordByCityName(city)
  console.log(`Coo leidas: ${coor_arr}`)
  const data = await fetchWeatherByCoords(coor_arr.lat, coor_arr.lng);
  if (data && data.name) {
    app.innerHTML = `
      <h2>Clima en ${data.name}</h2>
      <p>Temperatura: ${data.main.temp}°C</p>
      <p>Descripción: ${data.weather[0].description}</p>
    `;
  } else {
    app.innerHTML = `<p>No se pudo obtener información del clima.</p>`;
  }
}

// Coordenadas de Zapopan
console.log(renderWeather("Zapopan"));
