import { APICityManager } from "./utils/api_city_manager.js";
import { APIWeatherManager } from "./utils/api_weather_manager.js";

const app = document.getElementById("app");

async function renderWeather(city) {
  const apiCity = new APICityManager()
  const apiWeather = new APIWeatherManager()
  const coor_arr = await apiCity.getCityCoordsByName(city)
  console.log(`Coo leidas: ${coor_arr}`)
  const data = await apiWeather.getCurrentMainWeatherInfoByCoords(coor_arr.lat, coor_arr.lng);
  const iconUrl = `https://openweathermap.org/img/wn/${data.iconCod}@2x.png`;
  if (data && data.name) {
    app.innerHTML = `
      <h2>Clima en ${data.name}</h2>
      <p>Temperatura: ${data.temp}°C</p>
      <p>Humidity: ${data.humidity}%</p>
      <p>Humidity: ${data.visibility}</p>
      <p>Humidity: ${data.wind_speed}m/s</p>
      <img src="${iconUrl}" alt="${data.description}"> <!-- Mostrar el ícono -->
    `;
  } else {
    app.innerHTML = `<p>No se pudo obtener información del clima.</p>`;
  }
}

// Coordenadas de Zapopan
console.log(renderWeather("Zapopan"));
