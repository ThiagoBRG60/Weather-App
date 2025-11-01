import { sleep } from "../utils/sleep.js";
import { handleChangeLocationButton } from "./changeLocationButton.js"

const toastCard = document.querySelector(".toast-card");
const toastCardText = toastCard.querySelector("p");
const toastCardTimerBar = toastCard.querySelector("span");
const toastCardCloseButton = toastCard.querySelector("button");

let toastCardSeconds = 3;
let toastCardQuotient = 100 / toastCardSeconds;
let hideToastCard = false
let toastCardStack = []
let isToastStackActive = false

toastCardCloseButton.addEventListener("click", () => {
   hideToastCard = true
   handleChangeLocationButton({className: "", disabled: false})
})

async function showToastCard({status, message}) {
   toastCardStack.push({status, message})

   if (toastCardStack.length > 0 && !isToastStackActive) {
      isToastStackActive = true

      for (let i = 0; i < toastCardStack.length; i++) {
         hideToastCard = false

         toastCard.className = `toast-card showCard ${toastCardStack[i].status}`
         toastCardText.innerHTML = `${toastCardStack[i].status === "isError"
            ? `<svg width="24px" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z"/></svg>`
            : `<svg width="24px" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM390.7 233.9C398.5 223.2 413.5 220.8 424.2 228.6C434.9 236.4 437.3 251.4 429.5 262.1L307.4 430.1C303.3 435.8 296.9 439.4 289.9 439.9C282.9 440.4 276 437.9 271.1 433L215.2 377.1C205.8 367.7 205.8 352.5 215.2 343.2C224.6 333.9 239.8 333.8 249.1 343.2L285.1 379.2L390.7 234z"/></svg>`
         } ${toastCardStack[i].message}`

         setTimeout(() => {
            const intervaldId = setInterval(() => {
               if (toastCardSeconds.toFixed(2) <= 0 || hideToastCard) {
                  setTimeout(() => toastCard.className = `toast-card ${toastCardStack[i].status}`, hideToastCard ? 0 : 500)
                  setTimeout(() => {
                     toastCardTimerBar.style.width = "100%"
                     toastCardSeconds = 3
                     if (hideToastCard) sleepFn.cancel()
                     if (!hideToastCard) handleChangeLocationButton({className: "", disabled: false})
                  }, 1000)
                  clearInterval(intervaldId)
               }

               toastCardSeconds -= 0.05
               toastCardTimerBar.style.width = `${toastCardSeconds.toFixed(2) * toastCardQuotient}%`
            }, 50)
         }, 1000)

         const sleepFn = sleep(toastCardSeconds + 2.5)
         await sleepFn.promise
      }

      isToastStackActive = false
      toastCardStack = []
   }
}

export { showToastCard }