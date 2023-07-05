import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import { UIContext } from '../../context/ui/UIContext'
import { Entry } from '../../interfaces'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)

  /* Ejecutamos el evento para cuando se comience a realizar el drag de las entradas */
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging() // Llamamos al contexto, para que inicie el dragging
  }

  const onDragEnd = () => {
    endDragging() // Llamamos al contexto, para que finalice el dragging
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
