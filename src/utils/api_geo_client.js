import { ApiBaseClient } from "./api_base_client.js";

const BASE_URL = "https://api.opencagedata.com/geocode/v1"
const API_KEY = "e417ee4662534d1b80d237753dfa10c6"


export class ApiGeoClient extends ApiBaseClient {

    constructor(){
        super(BASE_URL, `key=${API_KEY}`)
    }

    async getCityCoordsByName(cityName){
        const endPoint = `json?q=${cityName}`
        const data = await this.getApiResponse(endPoint)
        if (data != null){
            return {
                lat: data.results[0].geometry.lat,
                lng: data.results[0].geometry.lng
            };
        }
        throw new Error(`Unable to get the current coords from city ${cityName}`);
    }
}