import { useRouter } from 'next/router';
import Link from 'next/link';

const style = {
  color: '#0070f3',
  textDecoration: 'underline'
}

export const ActiveLink = ({ text, href }) => {
  /* useRouter es un hook propio de next mediante el cual
  podemos acceder a la información del navegador, la ruta en donde estamos
  y mas información relacionada al router */
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a style={asPath === href ? style : null}>{text}</a>
    </Link>
  );
}
