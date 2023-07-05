import { createContext } from 'react'

/* Creamos la interfaz que nos permitirá definir los tipos de datos de los 
valores del contexto, asi como los métodos para cambiar este valor */
interface ContextProps {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean

  // Methods
  closeSideMenu: () => void
  openSideMenu: () => void

  setIsAddingEntry: (isAdding: boolean) => void

  endDragging: () => void
  startDragging: () => void
}

/* Creamos y exportamos el contexto usando la interfaz definida para el mismo */
export const UIContext = createContext({} as ContextProps)
