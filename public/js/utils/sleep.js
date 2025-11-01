function sleep(seconds) {
   if (typeof seconds !== "number") throw new Error("Seconds must be a number.")

   let resolveFn
   let timeoutId
   
   return {
      promise: () => {
         timeoutId = setTimeout(() => resolveFn(), seconds * 1000)
         return new Promise(resolve => resolveFn = resolve)
      },
      cancel: () => {
         clearTimeout(timeoutId)
         resolveFn()
      }
   }
}

export { sleep }