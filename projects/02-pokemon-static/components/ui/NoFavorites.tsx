import { FC } from 'react'
import { Container, Image, Text } from '@nextui-org/react'

export const NoFavorites: FC = () => {
  return (
    <Container css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: 'calc(100vh - 100px)',
    }}>
      <Text h1>No hay favoritos</Text>

      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
        alt='No hay favoritos'
        width={250}
        height={250}
        css={{
          opacity: 0.5
        }}
      />
    </Container>
  )
}
