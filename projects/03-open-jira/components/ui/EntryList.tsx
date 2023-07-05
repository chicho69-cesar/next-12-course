import { FC, useContext, useMemo, DragEvent } from 'react'
import { List, Paper } from '@mui/material'

import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { Entry, EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter((entry: Entry) => {
    return entry.status === status
  }), [entries, status])

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')

    const entry = entries.find((e: Entry) => e._id === id)!
    entry.status = status

    updateEntry(entry)
    endDragging()
  }

  return (
    // TODO: aquí haremos drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper 
        className={styles.scroll}
        sx={{ 
          height: status === 'pending' ? 'calc(100vh - 210px)' : 'calc(100vh - 160px)', 
          overflowY: 'scroll', 
          backgroundColor: 'transparent', 
          padding: '3px 5px' 
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}> 
          {
            entriesByStatus.map((entry: Entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
