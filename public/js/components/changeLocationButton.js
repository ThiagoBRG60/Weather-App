const changeLocationForm = document.querySelector("section form")
const changeLocationButton = changeLocationForm.querySelector("button")

function handleChangeLocationButton({className, disabled}) {
   changeLocationButton.className = className
   if (typeof disabled === "boolean") changeLocationButton.disabled = disabled
}

export { handleChangeLocationButton }