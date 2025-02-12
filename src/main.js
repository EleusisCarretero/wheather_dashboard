
import { ApiCityManager } from "./utils/api_city_manager.js";

const app = document.getElementById("app");

function readCurrentFiledInfo(){
  const mainAvailableFields = ["country-search", "country-list","city-search", "city-list", "city-name", "temperature", "humidity", "wind-speed", "weather-icon"]
  let objFields = {};
  for (var field of mainAvailableFields){
    var objName = field.replace("-","")
    objFields[objName] = document.getElementById(field);
  }
  return objFields
}

async function main() {
  

    const availableCountries = getCountryList()
    const cities = ["Zapopan", "Guadalajara", "Monterrey", "Ciudad de México", "Puebla", "Toluca"];
    const fields = readCurrentFiledInfo()
    fields.countrysearch.addEventListener("input", () => {
      const query = fields.countrysearch.value.toLowerCase();
      fields.countrylist.innerHTML = "";
      if(query){
        const filteredCountries = availableCountries.filter(country => country.toLowerCase().includes(query));
        filteredCountries.forEach(country =>{
          const li = document.createElement("li");
          li.textContent = country;
          li.addEventListener("click", async () => {
            fields.countrysearch.value = country;
            fields.countrylist.innerHTML = "";
            if (fields.countrysearch.value.trim() !== "") {
              fields.citysearch.disabled = false;
            }else{
              fields.citysearch.disabled = true;
            }
            
          });
          fields.countrylist.appendChild(li);
        });
      }
    });



    // fields.citysearch.addEventListener("input", () => {
    //   const query = fields.citysearch.value.toLowerCase();
    //   fields.citylist.innerHTML = "";

    //   if (query){
    //     const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
    //     filteredCities.forEach(city =>{
    //       const li = document.createElement("li");
    //       li.textContent = city;
    //       li.addEventListener("click", async () => {
    //         fields.citysearch.value = city;
    //         fields.citylist.innerHTML = "";
    //         await upDataCityData(city, fields)
    //       });
    //       fields.citylist.appendChild(li);
    //     });
    //   }
    // });
    // await upDataCityData(fields.cityname.textContent.split(": ")[1], fields);
}

function getCountryList() {
  return ["Mexico", "Colombia", "Ecuador", "Venezuela", "Argentina"];
}

async function renderWeather(city, fields) {
  const apiCityManagerInst = new ApiCityManager()
  const data = await apiCityManagerInst.getCityCurrentWeather(city);
  const iconUrl = `https://openweathermap.org/img/wn/${data.iconCod}@2x.png`;
  if (data && data.name) {
    fields.cityname.textContent = `Clima en ${city}`;
    fields.temperature.textContent = `Temperatura: ${data.temp}°C`;
    fields.humidity.textContent = `Humedad: ${data.humidity}%`;
    fields.windspeed.textContent = `Velocidad del viento: ${data.windSpeed} m/s`;
    fields.weathericon.src = iconUrl
    fields.weathericon.alt = data.description
  } else {
    app.innerHTML = `<p>NO weather information available.</p>`;
  }
}

async function fetchCityImage(cityName) {
  const apiCityManagerInst = new ApiCityManager()
  const cityPicture = await apiCityManagerInst.getCityImage(cityName)
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
