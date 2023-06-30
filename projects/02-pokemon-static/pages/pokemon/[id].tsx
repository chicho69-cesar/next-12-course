import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'

interface Props {
  pokemon: Pokemon
}

/* Recibimos la prop "pokemon" desde la función getStaticProps */
export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title='Algún Pokémon'>
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
                ghost
              >
                Guardar en favoritos
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
  es false se redirije a una pagina 404, si el valor es true se actuara como un
  'blocking' y se redirije la primera pagina definida en las paths. */
  return {
    paths: pokemons151.map((id: string) => ({
      params: { id }
    })),
    fallback: false
  }
}

/* Desestructuramos los params del contexto de la función getStaticProps */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string } // Obtenemos el id de los params regresados en getStaticPaths
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  /* Hacemos return de la static prop "pokemon" */
  return {
    props: {
      pokemon: data
    }
  }
}

export default PokemonPage
