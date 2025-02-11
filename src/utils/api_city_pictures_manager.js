import { APIManager } from "./api_manager.js";

const BASE_URL = "https://api.unsplash.com/search"
const API_KEY = "14zkZ8Wzv6WXFRv6s3BcXi86Wcz3rEHIgDmaE8bAV_k"

export class APICityPictureManager extends APIManager {

    constructor(){
        super(BASE_URL, `client_id=${API_KEY}`)
    }
    async getWetherPicture(city, weatherCondition){
        const endPoint = `photos?query=${city} ${weatherCondition}`
        const response = await this.getApiResponse(endPoint);
        return response.results[0].urls.regular;
    }
}
