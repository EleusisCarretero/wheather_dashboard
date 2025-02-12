import {ApiCityManager} from "../utils/api_city_manager.js"

export async function stateDisplayedCities(fields, currentState){
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
            currentState(4)
          });
          fields.citylist.appendChild(li);
        });
      }
    });
}

async function upDataCityData(city, fields) {
    try {
      await renderWeather(city, fields);
      await fetchCityImage(city);
    }catch(error){
      console.log("Unable to update weather information")
    }
}

async function fetchCityImage(cityName) {
    const apiCityManagerInst = new ApiCityManager()
    try{
    const cityPicture = await apiCityManagerInst.getCityImage(cityName)
    document.body.style.backgroundImage = `url(${cityPicture})`;
    }catch(error){
      alert(`There is no available pictures for city ${cityName} :(. But hey take this nice kitty instead`)
      const myKitty = await apiCityManagerInst.getRandomKitty()
      document.body.style.backgroundImage = `url(${myKitty})`;
    }
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