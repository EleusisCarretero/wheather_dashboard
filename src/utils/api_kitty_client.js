import { ApiBaseClient } from "./api_base_client.js";

const BASE_URL = "https://api.thecatapi.com/v1/images"


export class ApiKittyClient extends ApiBaseClient {

    constructor(){
        super(BASE_URL)
    }

    async getSomeKitties(limit){
        const endPoint = `search?limit=${limit}`
        const response = await this.getApiResponse(endPoint,false)
        return response.map(element => element.url);
    }

    async getSomeRandomKitty(limit=10){
        const randomNum = this.randomNum(1, limit);
        const kittiesList = await this.getSomeKitties(limit);
        return kittiesList[randomNum];

    }
    randomNum(min, max){
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

}