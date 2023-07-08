# Next.js OpenJira App

Para poder ejecutar la aplicación en tu propio entorno de desarrollo, debes de seguir los siguientes pasos:

## Configurar Docker, Base de Datos y Entorno

Para correr localmente, se necesita la base de datos, para ello debes de ejecutar el docker compose:

```bash
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__

* MongoDB URL Local

```bash
MONGO_URL=mongodb://localhost:27017/entriesdb
```

## Reconstruir los módulos de Node y Levantar la Aplicación

Para reconstruir los módulos de Node solamente se instalan las dependencias:

```bash
npm install
```

Una vez reconstruidos los módulos de Node, levantamos el entorno de ejecución de la aplicación con:

```bash
npm run dev
```

## Llenar la base de datos con información de pruebas

Llamar el endpoint del seeder, con un verbo GET desde algún cliente REST, en entorno de desarrollo. <http://localhost:3000/api/seed>
