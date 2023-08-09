import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

/* Definimos un Hire Order Component el cual lo usamos como un Layout
anidado dentro de otro layout */
export const DarkLayout: FC<Props> = ({ children }: Props) => {
  return (
    <div 
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <h3>Dark-Layout</h3>
      
      <div>
        {children}
      </div>
    </div>
  )
}
