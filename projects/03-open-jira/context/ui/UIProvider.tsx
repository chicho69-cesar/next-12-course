import React, { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

/* Creamos la interfaz de estado que tendrá nuestro contexto */
export interface UIState {
  sidemenuOpen: boolean
}

/* Creamos el estado inicial del contexto */
const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
}

interface Props {
  children?: React.ReactNode | undefined
}

export const UIProvider: FC<Props> = ({ children }) => {
  /* Con el hook useReducer podemos acceder a dos valores, el state, que es el estado
  actual que tiene el contexto y el dispatch que nos permite modificarlo a traves
  de los métodos definidos en el Context */
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  /* Creamos los métodos que modificarán el estado, mandando le un objeto
  de tipo de la acción definida en el reducer */
  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' })
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' })
  }

  /* Retornamos el provider de nuestro contexto, con el estado y con los métodos que 
  modificarán dicho estado */
  return (
    <UIContext.Provider value={{
      ...state,

      // Methods
      closeSideMenu,
      openSideMenu,
    }}>
      {children}
    </UIContext.Provider>
  )
}
