import type { NextPage } from 'next'
import { Card, CardHeader, Grid } from '@mui/material'

import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" />

            {/* Agregar una nueva tarea */}
            <NewEntry />

            <EntryList status='pending'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En Progreso" />
            <EntryList status='in-progress'/>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas" />
            <EntryList status='finished'/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
