
import { APICityManager } from "./utils/api_city_manager.js";
import { APIWeatherManager } from "./utils/api_weather_manager.js";
import { APICityPictureManager } from "./utils/api_city_pictures_manager.js";

const app = document.getElementById("app");

function readCurrentFiledInfo(){
  const mainAvailableFields = ["city-search", "city-list", "city-name", "temperature", "humidity", "wind-speed", "weather-icon"]
  let objFields = {};
  for (var field of mainAvailableFields){
    var objName = field.replace("-","")
    objFields[objName] = document.getElementById(field);
  }
  return objFields
}

async function main() {
    const cities = ["Zapopan", "Guadalajara", "Monterrey", "Ciudad de México", "Puebla", "Toluca"];
    const fields = readCurrentFiledInfo()
    fields.citysearch.addEventListener("input", () => {
      const query = fields.citysearch.value.toLowerCase();
      fields.citylist.innerHTML = "";

      if (query){
        const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
        filteredCities.forEach(city =>{
          const li = document.createElement("li");
          li.textContent = city;
          li.addEventListener("click", async () => {
            fields.citysearch.value = city;
            fields.citylist.innerHTML = "";
            // await renderWeather(city, fields);
            await upDataCityData(city, fields)
          });
          fields.citylist.appendChild(li);
        });
      }
    });
    // await renderWeather(fields.cityname.textContent.split(": ")[1], fields);
    await upDataCityData(fields.cityname.textContent.split(": ")[1], fields);
}

async function renderWeather(city, fields) {
  const apiCity = new APICityManager()
  const apiWeather = new APIWeatherManager()
  const coor_arr = await apiCity.getCityCoordsByName(city)
  console.log(`Coo leidas: ${coor_arr}`)
  const data = await apiWeather.getCurrentMainWeatherInfoByCoords(coor_arr.lat, coor_arr.lng);
  const iconUrl = `https://openweathermap.org/img/wn/${data.iconCod}@2x.png`;
  if (data && data.name) {
    fields.cityname.textContent = `Clima en ${data.name}`;
    fields.temperature.textContent = `Temperatura: ${data.temp}°C`;
    fields.humidity.textContent = `Humedad: ${data.humidity}%`;
    fields.windspeed.textContent = `Velocidad del viento: ${data.windSpeed} m/s`;
    fields.weathericon.src = iconUrl
    fields.weathericon.alt = data.description
  } else {
    app.innerHTML = `<p>No se pudo obtener información del clima.</p>`;
  }
}

async function fetchCityImage(city) {
  const apiCityImages = new APICityPictureManager()
  const cityPicture = await apiCityImages.getCityPicture(city)
  document.body.style.backgroundImage = `url(${cityPicture})`;
}

async function upDataCityData(city, fields) {
  try {
    await renderWeather(city, fields);
    await fetchCityImage(city);
  }catch(error){
    console.log("Unable to update weather information")
  }
}

main();
