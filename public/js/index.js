import { fetchData } from "./utils/fetchData.js"
import { returnLocaleDate } from "./utils/returnLocaleDate.js"
import { handleToastCard } from "./components/toastCard.js"
import { handleChangeLocationButton } from "./components/changeLocationButton.js"

const dateLis = document.querySelectorAll(".weather-picture-card ul:nth-of-type(1) li:not(li:nth-of-type(3))")
const locationPicture = document.querySelector(".location-picture")
const locationLi = document.querySelector(".weather-picture-card ul:nth-of-type(1) li:nth-of-type(3)")
const weatherInfoLis = document.querySelectorAll(".weather-picture-card ul:nth-of-type(2) li")
const weatherDetailsSpans = document.querySelectorAll(".weather-info-card ul li span")
const changeLocationForm = document.querySelector("section form")
const changeLocationInput = changeLocationForm.querySelector("input")

changeLocationForm.addEventListener("submit", handleFormSubmit)

try {
   const {cityName, regionName, countryName} = await fetchData({url: "https://free.freeipapi.com/api/json"})
   const userLocation = `${cityName}, ${regionName}, ${countryName}`
   const {translatedText, currentWeather, imageURL} = await getLocationData({locationText: userLocation, translationConfig: {from: "en", to: "pt-BR"}})
   updateWeatherCard({locationName: translatedText, weatherInfo: currentWeather, locationImage: imageURL})
} catch (error) {
   handleToastCard({status: "isError", message: "Houve um erro ao atualizar as informações. Tente novamente."})
}

async function handleFormSubmit(e) {
   e.preventDefault()
   const userInput = changeLocationInput.value.trim()
   
   if (userInput !== "") {
      handleChangeLocationButton({className: "isLoading", disabled: true})

      try {
         const {currentWeather, imageURL} = await getLocationData({locationText: userInput})
         updateWeatherCard({locationName: userInput, weatherInfo: currentWeather, locationImage: imageURL})
         handleToastCard({status: "isSuccess", message: "Local atualizado com sucesso!"})
      } catch (error) {
         handleToastCard({status: "isError", message: "Houve um erro ao atualizar as informações. Tente novamente."})
      } finally {
         handleChangeLocationButton({className: "isDisabled"})
      }

      changeLocationInput.value = ""
   } else {
      handleToastCard({status: "isError", message: "Por favor, digite um local válido."})
      handleChangeLocationButton({className: "isDisabled", disabled: true})
   }
}

async function getLocationData({locationText, translationConfig}) {
   const {translatedText} = await fetchData({url: "http://localhost:3000/translate", body: translationConfig ? {text: locationText, config: translationConfig} : {text: locationText}})
   const [{current}, {url}] = await Promise.all([
      fetchData({url: `http://localhost:3000/fetchWeather?q=${encodeURIComponent(translationConfig ? locationText : translatedText)}`}),
      fetchData({url: `http://localhost:3000/imageSearch?q=${encodeURIComponent(translationConfig ? locationText : translatedText)}`})
   ])

   return {translatedText, currentWeather: current, imageURL: url}
}

function updateWeatherCard({locationName, weatherInfo, locationImage}) {
   locationPicture.style.background = `url(${locationImage}) no-repeat 50% 50%`

   dateLis.forEach((li, index) => {
      const liData = {0: returnLocaleDate({weekday: "long"}), 1: returnLocaleDate({dateStyle: "long"})}
      li.textContent = liData[index]
   })

   locationLi.innerHTML = `
      <svg width="24px" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>
      ${locationName}
   `

   weatherInfoLis.forEach((li, index) => {
      const liData = {0: `<img src=${weatherInfo.condition.icon} alt="Weather icon"/>`, 1: `${weatherInfo.temp_c.toFixed(0)} °C`, 2: weatherInfo.condition.text}
      index === 0 ? li.innerHTML = liData[index] : li.textContent = liData[index]
   })

   weatherDetailsSpans.forEach((span, index) => {
      const spanData = {0: `${weatherInfo.precip_mm} mm`, 1: `${weatherInfo.humidity}%`, 2: `${weatherInfo.wind_kph} km/h`}
      span.textContent = spanData[index]
   })
}