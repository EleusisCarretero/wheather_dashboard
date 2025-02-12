import { ApiBaseClient } from "./api_base_client.js";

const BASE_URL = "https://countriesnow.space/api/v0.1"


export class ApiNamesClient extends ApiBaseClient {

    constructor(){
        super(BASE_URL)
    }

    async getSates(countryName){
        const endPoint = `countries/states`
        const data = await this.postApiRequest(endPoint, {"country": countryName}, false)
        return data.data.states
    }

    async getCities(countryName, stateName){
        const endPoint = `countries/state/cities`
        const data = await this.postApiRequest(endPoint, {"country": countryName, "state": stateName},false)
        return data.data
    }
}