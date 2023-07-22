import { FC, useReducer, ReactNode } from 'react'
import { UiContext, uiReducer } from './'

export interface UiState {
  isMenuOpen: boolean
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
}

interface Props {
  children?: ReactNode | ReactNode[]
}

export const UiProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer , UI_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' })
  }

  return (
    <UiContext.Provider value={{
      ...state,

      // Methods
      toggleSideMenu,
    }}>
      {children}
    </UiContext.Provider>
  )
}
