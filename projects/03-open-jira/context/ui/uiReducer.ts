import { UIState } from './'

/* Definimos las acciones que se pueden realizar sobre el estado de la 
interfaz de usuario, acciones que nos permitirán modificar el estado */
type UIActionType = 
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Set isAddingEntry', payload: boolean }
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  // Comparamos la acción ejecutada
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state, // Copiamos el estado anterior (Por si hay valores que no cambian)
        sidemenuOpen: true // Cambiamos el valor del estado (Solo lo que cambia con esta acción)
      }

    case 'UI - Close Sidebar':
      return {
        ...state,
        sidemenuOpen: false
      }

    case 'UI - Set isAddingEntry': 
      return {
        ...state,
        isAddingEntry: action.payload
      }

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true
      }

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false
      }

    /* Si el estado no cambia regresamos el mismo estado */
    default:
      return state
  }
}
