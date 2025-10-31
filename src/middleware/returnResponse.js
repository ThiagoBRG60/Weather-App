function returnResponse({response, statusCode, mimeType, body}) {
   response.writeHead(statusCode, {"content-type": `${mimeType};charset=utf-8`})
   body ? response.end(mimeType.includes("json") ? JSON.stringify(body) : body) : response.end()
}

export { returnResponse }