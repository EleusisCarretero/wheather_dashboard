import { ApiGeoClient } from "./api_geo_client.js";
import { ApiPictureClient } from "./api_picture_client.js";
import { ApiWeatherClient } from "./api_weather_client.js";
import { ApiNamesClient } from "./api_names_client.js";

export class ApiCityManager{
    constructor(){
        this.apiGeoClientInstance = new ApiGeoClient()
        this.apiPictureClientInstance = new ApiPictureClient()
        this.ApiWeatherClientInstance = new ApiWeatherClient()
        this.ApiNamesClientInstance =  new ApiNamesClient()
    }
    async getCityCurrentWeather(cityName){
        // 1. Get coords based on the city name
        const cityCoords = await this.apiGeoClientInstance.getCityCoordsByName(cityName)
        // 2. Get current weather data based on coords
        const weatherData = await this.ApiWeatherClientInstance.getCurrentMainWeatherInfoByCoords(...Object.values(cityCoords))
        return weatherData
    }
    async getCityImage(cityName){
        return await this.apiPictureClientInstance.getCityPicture(cityName)
    }
}