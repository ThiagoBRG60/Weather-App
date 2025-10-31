async function fetchData({url, body}) {
   try {
      const isBodyString = typeof body === "string"
      const config = body ? {method: "POST", headers: {"Content-Type": isBodyString ? "text/plain" : "application/json"}, body: isBodyString ? body : JSON.stringify(body)} : {method: "GET"}
      const response = await fetch(url, config)
      const contentType = response.headers.get("content-type")
      
      if (!response.ok) throw Error(`Status: ${response.status}, Text: ${response.statusText}`)
      if (contentType.includes("text/plain")) return await response.text()
      return await response.json()
   } catch (error) {
      throw error
   }
}

export { fetchData }