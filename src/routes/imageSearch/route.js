import { imageSearch } from "@mudbill/duckduckgo-images-api"
import { returnResponse } from "../../middleware/returnResponse.js"
import { createWriteStream, existsSync, ReadStream } from "node:fs"
import { basename, join } from "node:path"
import { mkdir, readdir } from "node:fs/promises"
import { pipeline } from "node:stream/promises"

const tempFolder = join(import.meta.dirname, "../../../dist/temp")

async function handleImageSearch(req, res, params) {
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

      const imageName = decodedParam.replace(/[^\wÀ-ÿ]+/g, "_").trim()
      const dirContent = await readdir(tempFolder)
      const foundFile = dirContent.find(file => file.includes(imageName))

      if (foundFile) {
         returnResponse({response: res, statusCode: 200, mimeType: "application/json", body: {url: `/${basename(tempFolder)}/${foundFile}`}})
      } else {
         const [locationImage] = await imageSearch({query: decodedParam})
         const imageExtension = locationImage.image.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)(?=[?#\s]|$)/i)
         const imagePath = await downloadLocationImage({imageUrl: locationImage.image, imageName: `${imageName}.${imageExtension[1]}`})
         
         returnResponse({response: res, statusCode: 200, mimeType: "application/json", body: {url: imagePath}})
      }
   } catch (error) {
      returnResponse({response: res, statusCode: 500, mimeType: "application/json", body: {error: `Internal Server Error: could not fetch image from external API: ${error.message}`}})
   }
}

async function downloadLocationImage({imageUrl, imageName}) {
   const response = await fetch(imageUrl)
   const bodyStream = ReadStream.from(response.body)

   if (!existsSync(tempFolder)) await mkdir(tempFolder)

   const filePath = join(tempFolder, imageName)
   const writeStream = createWriteStream(filePath)
   await pipeline(bodyStream, writeStream)

   return `/${basename(tempFolder)}/${imageName}`
}

export { handleImageSearch }