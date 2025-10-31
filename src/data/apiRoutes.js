import { handleImageSearch } from "../routes/imageSearch/route.js"
import { handleTranslate } from "../routes/translate/route.js"
import { handleFetchWeather } from "../routes/fetchWeather/route.js"

const routes = {
   "GET": {
      "/imageSearch": (req, res, params) => handleImageSearch(req, res, params),
      "/fetchWeather": (req, res, params) => handleFetchWeather(req, res, params)
   },
   "POST": {
      "/translate": (req, res, params) => handleTranslate(req, res, params)
   }
}

export { routes }