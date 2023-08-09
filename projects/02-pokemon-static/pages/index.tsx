import { NextPage, GetStaticProps } from 'next'

import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { Layout } from '../components/layouts'
import { PokemonCard, PokemonGrid } from '../components/pokemon'

interface Props {
  pokemons: SmallPokemon[]
}

/* Recibimos las props "pokemons" desde el getStaticProps */
const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokémons'>
      <PokemonGrid>
        {
          pokemons.map((pokemon: SmallPokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </PokemonGrid>
    </Layout>
  )
}

/* Cuando exportamos la función llamada getStaticProps en una Page lo que Next va a hacer
es que nuestra Pagina va a funcionar con SSG (Static Site Generation), Next va a
Pre-Renderizar la pagina en tiempo de compilación (build time) usando las props que
regresemos en esta función, es decir va a crear un archivo html y json con los datos que
representen las props que regresemos en esta función.
getStaticProps se ejecuta en el lado del servidor, no en el lado del cliente, y 
siempre se ejecuta con 'next build', es decir, siempre se ejecuta cuando hacemos
request a la pagina en desarrollo, pero al momento de hacer build se generan los archivos
estáticos y cuando hacemos 'next start' ya no se ejecutara porque se va a servir el 
archivo estático que ya se genero.

Usamos getStaticProps cuando:
- Los datos necesarios para representar la página están disponibles en el 
momento de la compilación antes de la solicitud del usuario.
- Los datos vienen de un Headless CMS, como Strapi, Sanity, etc.
- La pagina debe de ser Pre-Renderizada por SEO y para que sea muy rápida. */
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }) )

  /* Regresamos las props que va a utilizar la pagina */
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
