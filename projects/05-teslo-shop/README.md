# Next.js Teslo Shop

Para correr localmente, se necesita la base de datos.

```bash
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__

* MongoDB URL Local:

```env
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next

```bash
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara:

```curl
http://localhost:3000/api/seed
```

**Version next-auth:** 4.22.3
