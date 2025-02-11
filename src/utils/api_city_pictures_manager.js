import { APIManager } from "./api_manager.js";

const BASE_URL = "https://www.googleapis.com/customsearch"
const API_KEY = "AIzaSyCVbUkLOMrbxqznJEyaYFfD8_-5SGQoa-U"
const CX = "b07bfbe04782c4376"

export class APICityPictureManager extends APIManager {

    constructor(){
        super(BASE_URL, `key=${API_KEY}`)
        this.cx = `cx=${CX}`
    }
    async getCityPicture(city){
        const endPoint = `v1?q=${city}%20centro%20historico&searchType=image&${this.cx}`
        const response = await this.getApiResponse(endPoint);
        return response.items[0].link
    }
}
