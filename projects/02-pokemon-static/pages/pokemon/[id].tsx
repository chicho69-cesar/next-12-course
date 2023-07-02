import { useState } from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import confetti from 'canvas-confetti'

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils'

interface Props {
  pokemon: Pokemon
}

/* Recibimos la prop "pokemon" desde la función getStaticProps */
export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(localFavorites.existInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (isInFavorites) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0.1
      }
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>

              <Button
                color='gradient'
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En favoritos': 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction='row' display='flex' gap={ 0 }>
                <Image 
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                
                <Image 
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

                <Image 
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />

                <Image 
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

/* La función especial getStaticPaths es una función que debe de ser definida 
obligatoriamente cuando usamos SSG (Static Site Generation) con rutas dinámicas
y getStaticProps, ya que esta función va a definir los params que van a establecer cada
una de las posibles rutas de nuestra aplicación, es decir, vamos a usar esta función
cuando nosotros de antemano ya sabemos cuales van a ser las posibles paths de esta
pagina, al momento de hacer el build de la aplicación, Next generara una pagina
estática por cada una de las diferentes paths que regresemos en esta función.

Cuando deberíamos usar getStaticPaths:

- Cuando usamos renderizado estático con rutas dinámicas.
- Cuando usamos getStaticProps con rutas dinámicas. */
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151: string[] = [...Array(151)].map((_, index) => `${index + 1}`)

  /* La propiedad paths del objeto que regresamos es un arreglo de objetos
  donde para cada path debemos de definir los params, en este caso solo tenemos
  uno que es (id), pero si tuviéramos mas deberíamos de establecerlo aquí.
  La propiedad fallback es un booleano que indica si queremos que Next maneje 
  las rutas que no existen y que nos redirija a una pagina 404. Si el valor
  es false se redirije a una pagina 404, si el valor es true
  se redirije la primera pagina definida en las paths. */
  return {
    paths: pokemons151.map((id: string) => ({
      params: { id }
    })),
    // fallback: false
    /* La propiedad blocking de el objeto que regresa la función en la función
    getStaticPaths nos permite que si la ruta solicitada no esta definida
    en las paths esta no nos mande a la 404 y nos permite hacer ISR o ISG,
    donde: 
    
    - Incremental Static (Site) Regeneration nos permite regenerar las paginas
    de las rutas definidas cada cierta cantidad de tiempo, para que si la información
    cambia dado un tiempo regenerar la pagina para que tenga la nueva información.
    - Incremental Static Generation (ISG) nos permite generar la pagina de la ruta
    aunque el parámetro no este definido en las paths, es decir, se va a generar la
    pagina en caso de poder hacerlo aunque esta no se haya generado anteriormente, al 
    hacer build. */
    fallback: 'blocking'
  }
}

/* Desestructuramos los params del contexto de la función getStaticProps */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string } // Obtenemos el id de los params regresados en getStaticPaths
  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)
  
  const pokemon = await getPokemonInfo(id)

  /* Si el pokemon no existe es porque en la path que ingreso el usuario no se pudo obtener
  un pokemon, por lo tanto lo redireccionamos a la pagina principal */
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false /* Esta propiedad es util para que la redirección no sea
        permanente, y que si en un futuro ya existe este pokemon pueda volver a entrar */
      }
    }
  }

  /* Si el pokemon que validamos anteriormente si existe pero no esta su respectiva pagina
  generada como contenido estático, lo que hará Next es que la va a generar de forma
  automática, es decir, si entramos a un path donde no existe la pagina ya generada
  pero si existe el pokemon, entonces la va a generar automáticamente. En lo que se 
  conoce como Incremental Static Generation (ISG). */

  /* Hacemos return de la static prop "pokemon" */
  return {
    props: {
      // pokemon: data
      pokemon
    },
    /* Hacemos un Incrementa Static Regeneration cada 24 hrs, es decir, cada dia se 
    va a volver a hacer build de las paginas definidas en los paths */
    revalidate: 86400 // 60 seg * 60 min * 24 hrs = 1 day
  }
}

export default PokemonPage
