import { FC, useEffect, useReducer } from 'react'

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

  const addNewEntry = async (description: string) => {
    /* Creamos una nueva entrada */
    const { data } = await entriesApi.post<Entry>('/entries', { description })

    /* Lanzamos la acción para agregar la entrada, mandando la como payload; cuando
    se necesita enviar algún valor que cambie el estado en el reducer se debe de 
    mandar como payload. */
    dispatch({ type: '[Entry] Add-Entry', payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] Entry-Updated', payload: data })
    } catch (error) {
      console.log({ error })
    }
  }

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
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
