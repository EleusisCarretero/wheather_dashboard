import { APIManager } from "./api_manager.js";

const API_KEY = "23ea28807622ab533c98402d400fa334";
const BASE_URL = "https://api.openweathermap.org";


export class APIWeatherManager extends APIManager {

    constructor(){
        super(BASE_URL, `appid=${API_KEY}`)
    }

    async getCurrentMainWeatherInfoByCoords(lat, lng){
        const endPoint = `data/2.5/weather?lat=${lat}&lon=${lng}&units=metric`
        const data = await this.getApiResponse(endPoint)
        return {
            name: data.name,
            temp: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            visibility: data.visibility,
            windSpeed: data.wind.speed,
            iconCod: data.weather[0].icon
        }
    }
}