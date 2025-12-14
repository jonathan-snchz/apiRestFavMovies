# Proyecto Api Rest
## FavMovies

Proyecto para la escuela _RockTheCode_ donde se desarrolla una __Api Rest__ en la que se maneja la gestión de usuarios y sus películas favoritas.

Principalmente desarrollada con __Node.js, Express y MongoDB__ para la gestión de usuarios y películas en la base de datos. También se apoya en __Cloudinary__ para manejar las imágenes de perfil de los usuarios, la API __TMDB__ para rellenar información sobre las películas y __JWTGenerator__ para gestionar el login de usuarios.

## Arquitectura del proyecto
```
src/
├── api/
│   ├── controllers/     # Controladores 
│      ├── movie.js             ## Maneja la lógica para las películas
│      ├── user.js              ## Maneja la lógica para los usuarios
│   ├── models/          # Modelos de datos
│      ├── movie.js             ## Modelo para las películas
│      ├── user.js              ## Modelo para los usuarios
│   ├── routes/          # Rutas de la API
│      ├── movieRoutes.js       ## Rutas que manejan las películas
│      ├── userRoutes.js        ## Rutas que manejan los usuarios
│   ├── config/          # Configuraciones 
│      ├── db.js                ## Configura la conexión a la base de datos
│   ├── middlewares/     # Middlewares personalizados
│      ├── auth.js              ## Maneja las autorizaciones de los usuarios 
│      ├── imgUpload.js         ## Maneja la subida de imágenes a Cloudinary
│   └── utils/           # Utilidades varias
|      ├── seeds/               # Datos de prueba
│           ├── data/
│                └── movies.js  ## Películas
│           └── moviesSeed.js   ## Maneja la inyección de los datos de prueba
|      ├── jwt.js               ## Generación y verificación de los tokens para las autorizaciones
|      └── tmdbApiCall.js       ## Llamada a la api de TMDB para obtener la información de las películas
index.js
```

## Principales funcionalidades

* Registro de usuarios con posibilidad de añadir una foto de perfil. 
* Login con __JWT__.
* Roles de usuario (user, admin) con libertades extra para el usuario privilegiado.
* _CRUD_ de películas.
* Mucha información sobre las películas se rellena automáticamente gracias a la Api __TMDB__.
* Cada usuario puede almacenar sus películas favoritas.
* Cada usuario puede subir su imagen y se almacena en __Cloudinary__.

## Modelos de datos
### User
```
{
  name: String,        // required
  email: String,       // required, único
  password: String,    // required, mínimo 4 caracteres
  role: String,        // enum: ['user', 'admin'], default: 'user'
  image: String,       // URL de Cloudinary
  favMovies: Array     // Referencias a Movie
}
```
### Movie
```
{
  title: String,       // required, único
  categories: Array,   // enum: ['horror', 'drama', 'comedy', 'thriller', 'crime']
  year: String,        // fetch de TMDB
  img: String,         // URL de TMDB
  tmdbScore: Number    // fetch de TMDB
}
```
## Rutas

### User

| Método  | Ruta | Uso | Auth |
| ------------- |:-------------:|:-------------:|:-------------:|
| POST | /users/register | Registrar un nuevo usuario | None |
| POST | /users/login | LogIn el usuario | None |
| GET | /users | Listar los usuarios | Logged In |
| GET | /users/:id | Encontrar un usuario | Logged In |
| PUT | /users/:id | Actualizar un usuario | Owner/Admin |
| DELETE | /users/:id | Borrar usuario | Owner/Admin |
| PUT | /users/:id/favourites | Añadir o eliminar película de favoritos | Owner/Admin |
| PUT | /users/:id/role | Actualizar rol de usuario | Admin |
| PUT | /users/:id/password | Actualizar contraseña del usuario | Owner/Admin |

### Movie

| Método  | Ruta | Uso | Auth |
| ------------- |:-------------:|:-------------:|:-------------:|
| GET | /movies | Listar las películas | None |
| POST | /movies | Crear una película | None |
| PUT | /movies/:id | Actualizar una película | None |
| DELETE | /movies/:id | Borrar una película | None |

## Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB Atlas account
- Cuenta en Cloudinary
- API Key de TMDB

### Pasos de instalación
1. Clonar el repositorio
2. `npm install`
3. Configurar variables de entorno en `.env`
4. `npm run dev`

Hay un usuario creado con las credenciales ```admin@test.com / admin``` al que se le ha dado rol de admin manualmente en la base de datos. En este caso como es un proyecto para la escuela el .env y las claves están presentes para facilitar la correción. Además está incluido la colección de peticiones que usé en __Insomnia__
