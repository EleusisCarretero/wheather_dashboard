
export class APIManager {
    constructor(baseUrl, apiKey){
        this.baseUrl = baseUrl
        this.apiKey = apiKey

    }
    async getApiResponse(endPoint, setKey=true){
        try{
            const service = setKey? `${this.baseUrl}/${endPoint}&${this.apiKey}` : `${this.baseUrl}/${endPoint}`
            const response = await fetch(service);
            if (!response.ok) throw new Error("Invalid request");
            const data = await response.json();
            console.log(`Actual response data: ${data}`)
            return data
        }
        catch (error) {
            console.error(`Error ${error} trying to execute GET request service ${service}`);
            return null;
        }
    }
}