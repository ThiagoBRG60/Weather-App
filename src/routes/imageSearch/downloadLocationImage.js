import { createWriteStream, ReadStream } from "node:fs"
import { basename, join } from "node:path"
import { pipeline } from "node:stream/promises"

async function downloadLocationImage({imageUrl, imageName}) {
   const response = await fetch(imageUrl)
   const bodyStream = ReadStream.from(response.body)
   const filePath = join(tempFolder, imageName)
   const writeStream = createWriteStream(filePath)

   await pipeline(bodyStream, writeStream)
   return `/${basename(tempFolder)}/${imageName}`
}

export { downloadLocationImage }