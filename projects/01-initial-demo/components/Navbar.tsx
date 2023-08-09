import styles from './Navbar.module.css'

import { FC } from 'react'
import { ActiveLink } from './ActiveLink'

type MenuItem = {
  text: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    text: 'Home',
    href: '/'
  },
  {
    text: 'About',
    href: '/about'
  },
  {
    text: 'Contact',
    href: '/contact'
  },
  {
    text: 'Pricing',
    href: '/pricing'
  },
]

export const Navbar: FC = () => {
  return (
    /* Usamos los estilos de css modules con clases que utilizan guiones medios */
    <nav className={styles['menu-container']}>
      {
        menuItems.map(({ text, href }: MenuItem) => (
          <ActiveLink key={href} text={text} href={href} />
        ))
      }

      {/* 
        <ActiveLink text="Home" href="/" />
        <ActiveLink text="About" href="/about" />
        <ActiveLink text="Contact" href="/contact" /> 
        <ActiveLink text="Pricing" href="/pricing" />  
      */}
    </nav>
  )
}
