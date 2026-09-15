# Around the U.S. — Express API

## Descripción

API REST del proyecto "Alrededor de los EE. UU." construida con Node.js, Express y MongoDB (Mongoose). Proporciona endpoints para gestionar usuarios y tarjetas de lugares, persistiendo los datos en una base de datos real, sirviendo como backend para la aplicación frontend del mismo proyecto.

## Funcionalidad

### Usuarios

- `GET /users` — devuelve la lista completa de usuarios.
- `GET /users/:userId` — devuelve los datos del usuario con el ID especificado. Responde con `404` si no existe.
- `POST /users` — crea un nuevo usuario a partir de `name`, `about` y `avatar` en el body.
- `PATCH /users/me` — actualiza `name` y `about` del usuario autenticado.
- `PATCH /users/me/avatar` — actualiza el `avatar` del usuario autenticado.

### Tarjetas

- `GET /cards` — devuelve la lista completa de tarjetas.
- `POST /cards` — crea una nueva tarjeta a partir de `name` y `link` en el body; el `owner` se toma del usuario autenticado.
- `DELETE /cards/:cardId` — elimina una tarjeta por su ID.
- `PUT /cards/:cardId/likes` — da like a una tarjeta.
- `DELETE /cards/:cardId/likes` — quita el like de una tarjeta.

### Manejo de errores

- Cualquier ruta no existente devuelve `404` con `{ "message": "Recurso solicitado no encontrado" }`.
- Datos inválidos al crear/actualizar un usuario o tarjeta devuelven `400`.
- Usuario o tarjeta no encontrados devuelven `404`.
- Errores inesperados del servidor devuelven `500` con `{ "message": "Ha ocurrido un error en el servidor" }`.
- Todos los mensajes de error de la API están en español.

> **Nota:** la identidad del usuario que realiza cada petición (`req.user._id`) se resuelve actualmente mediante un middleware temporal con un ID fijo, a la espera de implementar autenticación real en un sprint posterior.

## Tecnologías y técnicas

- **Node.js** — entorno de ejecución del servidor.
- **Express** — framework para la creación de rutas y manejo de peticiones HTTP.
- **MongoDB + Mongoose** — base de datos y modelado de esquemas (`user`, `card`) con validaciones, incluida una expresión regular personalizada para validar URLs de avatar/imagen.
- **Arquitectura modular** — el código se separa en `routes/` (definición de endpoints), `controllers/` (lógica de negocio) y `models/` (esquemas de Mongoose).
- **nodemon** — reinicio automático del servidor ante cambios en los archivos (hot reload).
- **ESLint + Airbnb Base** — linting y estilo de código consistente.

## Scripts

| Comando         | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run start` | Inicia el servidor en `localhost:3000` |
| `npm run dev`   | Inicia el servidor con hot reload      |
| `npm run lint`  | Ejecuta el linter ESLint               |

## Requisitos previos

- MongoDB corriendo en `mongodb://localhost:27017` (la base de datos `aroundb` se crea automáticamente en el primer arranque).
