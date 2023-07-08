import { FC, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack'

import { entriesApi } from '../../apis'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

interface Props {
  children?: React.ReactNode | undefined
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()

  const addNewEntry = async (description: string) => {
    /* Creamos una nueva entrada */
    const { data } = await entriesApi.post<Entry>('/entries', { description })

    /* Lanzamos la acción para agregar la entrada, mandando la como payload; cuando
    se necesita enviar algún valor que cambie el estado en el reducer se debe de 
    mandar como payload. */
    dispatch({ type: '[Entry] Add-Entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] Entry-Updated', payload: data })

      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada con éxito', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        })
      }
    } catch (error) {
      enqueueSnackbar('Error al actualizar la entrada', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      })
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${id}`)
      dispatch({ type: '[Entry] Delete-Entry', payload: data })

      enqueueSnackbar('Entrada eliminada con éxito', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      })
    } catch (error: any) {
      enqueueSnackbar('Error al eliminar la entrada', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      })
    }
  }

  /* Usamos esta función para hacer la carga inicial de las entradas que están en 
  base de datos mediante la acción del reducer cargamos las entradas que obtenemos
  de la api en el estado global con el context. */
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] Refresh-Data', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{
      ...state,

      // Methods
      addNewEntry,
      updateEntry,
      deleteEntry,
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
