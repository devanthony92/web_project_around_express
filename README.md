# Around the U.S. — Express API

## Descripción

API REST del proyecto "Alrededor de los EE. UU." construida con Node.js y Express. Proporciona endpoints para gestionar usuarios y tarjetas de lugares, sirviendo como backend para la aplicación frontend del mismo proyecto.

## Funcionalidad

- `GET /users` — devuelve la lista completa de usuarios en formato JSON.
- `GET /users/:userId` — devuelve los datos del usuario con el ID especificado. Responde con `404` si no existe.
- `GET /cards` — devuelve la lista completa de tarjetas en formato JSON.
- Cualquier ruta no existente devuelve `404`.
- Los errores de servidor devuelven `500`.

## Tecnologías y técnicas

- **Node.js** — entorno de ejecución del servidor.
- **Express** — framework para la creación de rutas y manejo de peticiones HTTP.
- **Módulo `fs`** — lectura asíncrona de archivos de datos JSON.
- **Módulo `path`** — construcción de rutas de archivos multiplataforma con `path.join()`.
- **nodemon** — reinicio automático del servidor ante cambios en los archivos (hot reload).
- **ESLint + Airbnb Base** — linting y estilo de código consistente.

## Scripts

| Comando         | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run start` | Inicia el servidor en `localhost:3000` |
| `npm run dev`   | Inicia el servidor con hot reload      |
| `npm run lint`  | Ejecuta el linter ESLint               |
