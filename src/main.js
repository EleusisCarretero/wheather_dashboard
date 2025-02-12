
import { ApiCityManager } from "./utils/api_city_manager.js";

const app = document.getElementById("app");

function readCurrentFiledInfo(){
  const mainAvailableFields = ["country-search", "country-list","state-search", "state-list","city-search", "city-list", "city-name", "temperature", "humidity", "wind-speed", "weather-icon"]
  let objFields = {};
  for (var field of mainAvailableFields){
    var objName = field.replace("-","")
    objFields[objName] = document.getElementById(field);
  }
  return objFields
}

async function main() {
  const fields = readCurrentFiledInfo()
  stateManager(1, fields)
}

function stateManager(currentState, fields){
  switch(currentState){
    case 1: //Standby State: country-list = true; city-list = false
      // 1. Wait for user to introduce text on the field:country-lis
      stateStandBy(currentState, fields)
      break;
    case 2: //Pre-research: country-list = true; city-list = true
      stateDisplayedStates(currentState, fields)
      break;
    case 3: // Re-weather research: country-list = true; city-list = true; reSearch=True
      stateDisplayedCities(currentState, fields)
      break;
    case 4:
      stateAwait(currentState, fields)
      break;
  }

}

function stateStandBy(currentState, fields){
  const availableCountries = getCountryList()
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
              fields.statesearch.disabled = false;
              currentState = 2
              stateManager(currentState, fields)
            }else{
              fields.statesearch.disabled = true;
              // state = 1
            }
        });
        fields.countrylist.appendChild(li);
      });
    }
  });
}

async function stateDisplayedStates(currentState, fields){
  const apiCityManagerInst = new ApiCityManager()
  const states = await apiCityManagerInst.getSatesList(fields.countrysearch.value)
  fields.statesearch.addEventListener("input", () => {
    const query = fields.statesearch.value.toLowerCase();
    fields.statelist.innerHTML = "";
    if (query){
      const filteredStates = states.filter(state => state.toLowerCase().includes(query));
      filteredStates.forEach(state =>{
        const li = document.createElement("li");
        li.textContent = state;
        li.addEventListener("click", async () => {
          fields.statesearch.value = state;
          fields.statelist.innerHTML = "";
          if (fields.statesearch.value.trim() !== "") {
            fields.citysearch.disabled = false;
            currentState = 3
            stateManager(currentState, fields)
          }else{
            fields.citysearch.disabled = true;
          }
        });
        fields.statelist.appendChild(li);
      });
    }
  });
}

async function stateDisplayedCities(currentState, fields){
  const apiCityManagerInst = new ApiCityManager()
  const cities = await apiCityManagerInst.getCitiesList(fields.countrysearch.value, fields.statesearch.value)
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
          await upDataCityData(city, fields)
          currentState = 4
          stateManager(currentState, fields)
        });
        fields.citylist.appendChild(li);
      });
    }
  });
}

function stateAwait(currentState, fields){
  // 1. Check country has text
  fields.countrysearch.addEventListener("click", () => {
    if(fields.countrysearch.value.trim() == ""){
      fields.statesearch.value = "";
      fields.statesearch.disabled = true;

      fields.citysearch.value = "";
      fields.citysearch.disabled = true;

      currentState = 2
      stateManager(currentState, fields)
    }
  });
  // 2. Check State has text
  fields.citysearch.addEventListener("click", () =>{
    if(fields.statesearch.value.trim() == ""){
      fields.citysearch.value = "";
      fields.citysearch.disabled = true;
      currentState = 3
      stateManager(currentState, fields)
    }
  });

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
