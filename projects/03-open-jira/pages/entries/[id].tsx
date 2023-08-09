import { ChangeEvent, useMemo, useState, useContext } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { dbEntries } from '../../database'
import { IEntry } from '../../models'
import { Entry, EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'
import { Layout } from '../../components/layouts'
import { dateFunctions } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  const router = useRouter()

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid =  useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus( event.target.value as EntryStatus );
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true);
  }

  const onDelete = (id: string) => {
    deleteEntry(id)
    router.replace('/')
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader 
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />

            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanged}
                >
                  {validStatus.map((option: EntryStatus) => (
                    <FormControlLabel 
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton 
        onClick={() => onDelete(entry._id)}
        sx={{
          position:'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

/* Cuando exportamos la función llamada getServerSideProps, lo que Next hace es que esta
función se va a ejecutar en el lado del servidor, y mediante esta función podemos
retornar las props que la pagina va a recibir pero del lado del servidor, con lo que
esta pagina se renderizara en el lado del servidor, consiguiendo asi hacer Server Side
Rendering, por lo que al momento de que un usuario haga request de esta pagina, el 
servidor va a ejecutar esta función, y con lo que se haga durante esta ejecución va a 
regresar las props que nuestra pagina necesita para ser renderizada.

Utilizamos getServerSideProps cuando:
- Unicamente si necesitamos pre-renderizar una pagina cuya data debe ser solicitada
al momento de que el cliente hace request.
- La pagina necesita datos que no son accesibles desde el lado del cliente.
- Necesitamos ejecutar código solamente del lado del servidor. */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx
  const { id } = params as { id: string }

  const entry: (IEntry | null) = await dbEntries.getEntryByID(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage
