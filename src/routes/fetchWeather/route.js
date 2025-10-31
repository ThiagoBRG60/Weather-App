import { returnResponse } from "../../middleware/returnResponse.js"

async function handleFetchWeather(req, res, params) {
   try {
      if (!params.q) {
         returnResponse({response: res, statusCode: 400, mimeType: "application/json", body: {error: `Missing parameter: the "q" parameter is required.`}})
         return
      }

      const decodedParam = decodeURIComponent(params.q)

      if (decodedParam.trim() === "" || typeof decodedParam !== "string") {
         returnResponse({response: res, statusCode: 400, mimeType: "application/json", body: {error: "Invalid Parameter: must be a non-empty string."}})
         return
      }

      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${decodedParam}&aqi=no&pollen=no&lang=pt`)
      const data = await response.json()
      returnResponse({response: res, statusCode: 200, mimeType: "application/json", body: data})
   } catch (error) {
      returnResponse({response: res, statusCode: 500, mimeType: "application/json", body: {error: "Internal Server Error: could not fetch weather info from external API."}})
   }
}

export { handleFetchWeather }