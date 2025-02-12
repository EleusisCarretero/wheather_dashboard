import { ApiGeoClient } from "./api_geo_client.js";
import { ApiPictureClient } from "./api_picture_client.js";
import { ApiWeatherClient } from "./api_weather_client.js";
import { ApiNamesClient } from "./api_names_client.js";
import { ApiKittyClient } from "./api_kitty_client.js";

export class ApiCityManager{
    constructor(){
        this.apiGeoClientInstance = new ApiGeoClient()
        this.apiPictureClientInstance = new ApiPictureClient()
        this.ApiWeatherClientInstance = new ApiWeatherClient()
        this.ApiNamesClientInstance =  new ApiNamesClient()
        this.ApiKittyClientInstance = new ApiKittyClient()
    }
    async getCityCurrentWeather(cityName){
        // 1. Get coords based on the city name
        const cityCoords = await this.apiGeoClientInstance.getCityCoordsByName(cityName)
        // 2. Get current weather data based on coords
        const weatherData = await this.ApiWeatherClientInstance.getCurrentMainWeatherInfoByCoords(...Object.values(cityCoords))
        return weatherData
    }

    async getCityImage(cityName, tries=3){
        let validFormats = ["png", "jpg"]
        let iniTry = 0
        let imageResponse = null
        while (iniTry < tries) {
            try{
                imageResponse = await this.apiPictureClientInstance.getCityPicture(cityName, iniTry);
                const isValid = validFormats.some(format => imageResponse.toLowerCase().includes(format.toLowerCase()));
                if (!isValid){
                    imageResponse = null
                    throw new Error("continue trying");
                }
               break;
            }catch (error){
                iniTry += 1
            }
        }
        if (!imageResponse){
            throw new Error("Invalid request");
        }
        return imageResponse
    }

    async getSatesList(countryName){
        const statesList = await this.ApiNamesClientInstance.getSates(countryName)
        return statesList.map(state => state.name);
    }
    async getCitiesList(countryName, stateName){
        const statesList = await this.ApiNamesClientInstance.getCities(countryName, stateName)
        return statesList
    }

    async getRandomKitty(){
        return await this.ApiKittyClientInstance.getSomeRandomKitty();
    }
}