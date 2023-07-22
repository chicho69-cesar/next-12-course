import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui/ItemCounter'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter()
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`)

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow 
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* títulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter />
              <SizeSelector 
                // selectedSize={ product.sizes[2] } 
                sizes={product.sizes}
              />
            </Box>

            {/* Agregar al carrito */}
            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

            {/* Descripción */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// getServerSideProps...
//* No usar esto... SSR
/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
} */

// getStaticPaths...
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

// getStaticProps...
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
