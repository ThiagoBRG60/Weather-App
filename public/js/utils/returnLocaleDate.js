function returnLocaleDate(config) {
   return new Date().toLocaleDateString("pt-BR", config)
}

export { returnLocaleDate }