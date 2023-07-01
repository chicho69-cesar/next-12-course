import { FC, ReactNode } from 'react'
import { Grid } from '@nextui-org/react'

interface Props {
  children?: ReactNode | ReactNode[]
}

export const PokemonGrid: FC<Props> = ({ children }) => {
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
      {children}
    </Grid.Container>
  )
}
