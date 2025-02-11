import { APIManager } from "./api_manager.js";

const BASE_URL = "https://api.opencagedata.com/geocode/v1"
const API_KEY = "e417ee4662534d1b80d237753dfa10c6"


export class APICityManager extends APIManager {

    constructor(){
        super(BASE_URL, `key=${API_KEY}`)
    }

    async getCityCoordsByName(cityName){
        const endPoint = `json?q=${cityName}`
        const data = await this.getApiResponse(endPoint)
        return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
          };
    }
}