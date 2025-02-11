const API_KEY = "23ea28807622ab533c98402d400fa334"; // Sustituye con tu clave real
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const CITY_BASE_URL = "https://api.opencagedata.com/geocode/v1"
const CITY_API_KEY = "e417ee4662534d1b80d237753dfa10c6"

export async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error("Error en la solicitud");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    return null;
  }
}

export async function fetchCoordByCityName(city_name) {
    try{
        const response = await fetch(`${CITY_BASE_URL}/json?q=${city_name}&key=${CITY_API_KEY}`);
        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        console.log(`Data info ${data}`)
        console.log(`Latitud ${data.results[0].geometry.lat}`)
        console.log(`Longitud ${data.results[0].geometry.lng}`)
        return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
          };
    } catch (error) {
        console.error("Error al obtener el clima:", error);
        return null;
    }
}
