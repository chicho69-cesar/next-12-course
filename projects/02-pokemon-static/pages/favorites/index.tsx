import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { Layout } from '../../components/layouts'
import { localFavorites } from '../../utils'
import { NoFavorites } from '../../components/ui'
import { FavoritePokemons } from '../../components/pokemon'

const FavoritesPage: NextPage = () => {
  /* Los estados son código que solamente se ejecutara en el cliente, ya que esto
  no es propiamente código que deba ser prerenderizado en el servidor, por lo tanto
  esto se hidratara al código de la app en el cliente */
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  /* Los efectos también son código que se hidrata en el cliente y por ende
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