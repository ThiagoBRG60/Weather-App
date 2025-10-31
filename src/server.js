import { createReadStream, existsSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join } from "node:path"
import { createBrotliCompress } from "node:zlib"
import { pipeline } from "node:stream/promises"
import { returnResponse } from "./middleware/returnResponse.js"
import mimeTypes from "./data/mimeTypes.json" with {type: "json"}
import { routes } from "./data/apiRoutes.js"

const server = createServer(async (req, res) => {
   try {
      const url = new URL(`http://${req.headers.host}${req.url}`)
      const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname)
      const fileExtension = extname(pathname)
   
      if (!fileExtension) {
         const route = routes[req.method][pathname]
         let queryParams = null
   
         if (url.search) queryParams = Object.fromEntries(url.searchParams)
   
         route(req, res, queryParams)
         return
      }
   
      const rootFolder = join(import.meta.dirname, "../dist")
      const filePath = join(rootFolder, pathname)
   
      if (!existsSync(filePath) || !filePath.includes("dist")) {
         returnResponse({response: res, statusCode: 404, mimeType: "application/json", body: {error: `Invalid Request: File ${pathname} not found.`}})
         return
      }
   
      const textExtensions = [".html", ".css", ".js", ".json", ".xml"]
      const brotliExtensions = [...textExtensions, ".woff", ".woff2", ".ttf", ".otf"]
      const brotliCompress = createBrotliCompress()
      const canBeCompressed = brotliExtensions.includes(fileExtension)
      const readStream = createReadStream(filePath)
      const responseConfig = {"content-type": textExtensions.includes(fileExtension) ? `${mimeTypes[fileExtension]};charset=utf-8` : mimeTypes[fileExtension]}
   
      readStream.on("open", () => res.writeHead(200, canBeCompressed ? {...responseConfig, "content-encoding": "br"} : responseConfig))
      canBeCompressed ? await pipeline(readStream, brotliCompress, res) : await pipeline(readStream, res)
   } catch (error) {
      returnResponse({response: res, statusCode: 404, mimeType: "application/json", body: {error: `Invalid Request: Route not found or method not allowed.`}})
   }
})

server.listen(3000, () => console.log("Server running on: http://localhost:3000"))