import { EntriesState } from './'
import { Entry } from '../../interfaces'
      
type EntriesActionType = 
  | { type: '[Entry] Add-Entry', payload: Entry } 
  | { type: '[Entry] Entry-Updated', payload: Entry }
  | { type: '[Entry] Refresh-Data', payload: Entry[] }
  | { type: '[Entry] Delete-Entry', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] Add-Entry':
      return {
        ...state,
        /* Modificamos el valor de las entries en base al payload recibido */
        entries: [ ...state.entries, action.payload ]
      }

    case '[Entry] Entry-Updated':
      return {
        ...state,
        entries: state.entries.map((entry: Entry): Entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }

          return entry
        })
      }

    case '[Entry] Delete-Entry':
      return {
        ...state,
        entries: state.entries.filter((entry: Entry): boolean => entry._id !== action.payload._id)
      }

    case '[Entry] Refresh-Data':
      return {
        ...state,
        entries: [...action.payload]
      }

    default:
      return state
  }
}
