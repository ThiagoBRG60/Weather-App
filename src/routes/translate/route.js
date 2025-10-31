import { translate } from "@vitalets/google-translate-api"
import { returnResponse } from "../../middleware/returnResponse.js"

async function handleTranslate(req, res, params) {
   let body = ""

   req.on("data", (chunk) => body += chunk.toString())
   req.on("end", async () => {
      try {
         const parsedBody = JSON.parse(body)

         if (!parsedBody.text) {
            returnResponse({response: res, statusCode: 400, mimeType: "application/json", body: {error: `Missing parameter: the "text" property is required in the request body.`}})
            return
         }

         if (parsedBody.text.trim() === "" || typeof parsedBody.text !== "string") {
            returnResponse({response: res, statusCode: 400, mimeType: "application/json", body: {error: "Invalid Body: must be a non-empty string."}})
            return
         }

         const {text} = await translate(parsedBody.text, parsedBody.config ? parsedBody.config : {from: "pt-BR", to: "en"})
         returnResponse({response: res, statusCode: 200, mimeType: "application/json", body: {translatedText: text}})
      } catch (error) {
         returnResponse({response: res, statusCode: 500, mimeType: "application/json", body: {error: `Internal Server Error: could not translate text: ${error.message}`}})
      }
   })
}

export { handleTranslate }