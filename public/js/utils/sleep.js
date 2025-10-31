function sleep(seconds) {
   let resolveFn
   const timeoutId = setTimeout(() => resolveFn(), seconds * 1000)
   const promise = new Promise((resolve) => resolveFn = resolve)

   return {
      promise,
      cancel: () => {
         clearTimeout(timeoutId)
         resolveFn()
      }
   }
}

export { sleep }