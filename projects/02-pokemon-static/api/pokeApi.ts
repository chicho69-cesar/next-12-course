import axios, { type AxiosInstance } from 'axios'

/* Creamos la instancia de axios para que se pueda llamar desde 
cualquier lugar */
const pokeApi: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export default pokeApi
