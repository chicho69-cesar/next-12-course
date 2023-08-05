import { useContext } from 'react'
import { AuthContext } from '../context'

export const useAdminUser = () => {
  const { user } = useContext(AuthContext)
  const isAdminUser = user?.role === 'admin'
  return { isAdminUser }
}
