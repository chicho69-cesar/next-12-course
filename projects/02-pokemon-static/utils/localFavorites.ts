const toggleFavorite = (id: number): void => {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (favorites.includes(id)) {
    favorites = favorites.filter(pokeId => pokeId !== id)
  } else {
    favorites.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id: number): boolean => {
  /* Condición para cuando esta función es llamada del lado del servidor
  donde no tenemos acceso al localStorage */
  if (typeof window === 'undefined') return false
  const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
  return favorites.includes(id)
}

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]')
}

const exports = {
  existInFavorites,
  pokemons,
  toggleFavorite
}

export default exports
