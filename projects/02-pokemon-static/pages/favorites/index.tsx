import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { Layout } from '../../components/layouts'
import { localFavorites } from '../../utils'
import { NoFavorites } from '../../components/ui'
import { FavoritePokemons } from '../../components/pokemon'

const FavoritesPage: NextPage = () => {
  /* Los estados son código que se ejecutan tanto del lado del cliente como del 
  servidor, ya que el servidor también necesita acceder al estado de los componentes
  para renderizarlos */
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  /* Los efectos son código que se hidrata en el cliente y por ende
  no se ejecuta ni en el servidor ni en build time */
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])
  
  return (
    <Layout title='Pokémons - Favoritos'>
      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons pokemons={favoritePokemons}/>)
      }
    </Layout>
  )
}

export default FavoritesPage
