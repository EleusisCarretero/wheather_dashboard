import { ApiBaseClient } from "./api_base_client.js";

const BASE_URL = "https://www.googleapis.com/customsearch"
const API_KEY = "AIzaSyCVbUkLOMrbxqznJEyaYFfD8_-5SGQoa-U"
const CX = "b07bfbe04782c4376"

export class ApiPictureClient extends ApiBaseClient {

    constructor(){
        super(BASE_URL, `key=${API_KEY}`)
        this.cx = `cx=${CX}`
    }
    async getCityPicture(city, indx){
        const endPoint = `v1?q=${city}%20centro%20historico&searchType=image&${this.cx}`
        const response = await this.getApiResponse(endPoint);
        return response.items[indx].link
    }
}
