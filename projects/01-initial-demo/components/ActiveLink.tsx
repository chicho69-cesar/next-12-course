import { CSSProperties, FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const style: CSSProperties = {
  color: '#0070f3',
  textDecoration: 'underline'
}

type Props = {
  text: string
  href: string
}

export const ActiveLink: FC<Props> = ({ text, href }:  Props) => {
  /* useRouter es un hook propio de next mediante el cual
  podemos acceder a la información del navegador, la ruta en donde estamos
  y mas información relacionada al router */
  const { asPath } = useRouter()

  return (
    <Link href={href}>
      <a style={asPath === href ? style : undefined}>{text}</a>
    </Link>
  )
}
