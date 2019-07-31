CONSIGNA
Trabajo Práctico JS - DOM
Generar una página según el modelo del mockup, tanto mobile, como desktop (ejemplo real: https://ada-trabajo-practico-3-ahewymdcrw.now.sh/).

Dentro de la carpeta assets van a encontrar todas las imagenes necesarias.

La API para extraer la información es: https://api.themoviedb.org

Para utilizar la API, es necesario crear una APIKey. La APIKey es un código que nos va a permitir tener acceso y consultar los datos de las películas.

Crear una cuenta en TMDB ingresando a https://www.themoviedb.org/account/signup
Una vez creada la cuenta (luego de verificar la cuenta de email), ingresar dentro de perfil a Settings (screenshot)
Hacer click en la opción API, que se encuentra en el menu del lado izquierdo (screenshot)
Hacer click en el botón Create (screenshot)
Hacer click en la opción Developer (screenshot)
Nos va a pedir una aceptación de términos y condiciones
En la siguiente pantalla, nos aparecerá un formulario el cual tenemos que rellenar (pero podemos inventar la información) (screenshot)
Una vez que enviamos el formulario, nos aparece un panel con la información sobre la API. En particular, nos vamos a quedar con el valor que aparece en el cuadro API Key. (screenshot)
Las pantallas que vamos a tener son las siguientes:

Home

Home Desktop
Home Mobile
Listado de películas por categoría o búsqueda (las 4 categorías y el resultado de búsqueda tienen el mismo diseño)

Listado de películas Desktop
Listado de películas Mobile
Detalle de película (modal)

Modal detalle de película Desktop
Modal detalle de película Mobile
Menu de categorías (solo mobile)

Menu de categorías (solo mobile)
Descripción por pantalla
En todas las pantallas se van a ver tanto la barra de búsqueda como el sidebar de categorías.

Home

Tenemos un header (con una imagen que pueden cambiar) y el título general del sitio (que también pueden modificar).

Debajo aparecen 4 filas (una por cada categoría de películas: popular, top rated, upcoming y now playing). Dentro de cada categoría vemos las 5 primeras películas que nos devolvió la API y un botón View All, que nos redirigirá a la pantalla de la categoría específica.

Para sacar la información de cada categoría, vamos a utilizar la API:

// categoria Popular
`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
// categoría Top Rated
`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
// categoría Upcoming
`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
// categoría Now Playing
`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
Listado por categoría o búsqueda

Tanto cuando hacemos click en una categoría específica, como cuando buscamos peliculas por palabras claves, la pantalla que vemos es idéntica.

Tenemos primero el titulo de la sección (Popular Movies, Top Rated Movies, Upcoming Movies, Now Playing Movies, Search Results) y, pegado al margen derecho, la cantidad de resultados de películas.

Luego, el listado de las películas de la categoría o como resultado de la búsqueda.

Al final, un botón LOAD MORE. Esto es debido a que la API devuelve todos los resultados paginados, de a 20 resultados por vez. Esto quiere decir que en lugar de tener un array con (por ejemplo) 60 películas, vamos a tener un array con 20. Cuando hacemos click en el botón load more, obtenemos un nuevo array con 20 peliculas más, y así sucesivamente hasta no tener más "páginas".

Para pedirle la información a la API, vamos a utilizar las siguientes URLs:

// si hicimos click en la categoria Popular, las peliculas a mostrar la sacamos de:
`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`

// si hicimos click en la categoria Top Rated, las peliculas a mostrar la sacamos de:
`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${paginaActual}`

// si hicimos click en la categoria Upcoming, las peliculas a mostrar la sacamos de:
`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${paginaActual}`

// si hicimos click en la categoria Now Playing, las peliculas a mostrar la sacamos de:
`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${paginaActual}`

// si hicimos una búsqueda por palabra clave, las peliculas a mostrar la sacamos de:
`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${paginaActual}`
paginaActual es una variable numérica que empieza en 1 y vamos a ir incrementando cuando hacemos click en LOAD MORE. Al incrementar, estamos "avanzando" a la siguiente página de películas, por lo que volvemos a hacer el pedido a la misma dirección de las APIs para pedir las próximas 20 películas en la categoría.

Detalle de la película

Es un modal que se abre al hacer click en una película. En el mismo se muestra la información de la película que tenemos en el objeto devuelto por la API.

Para sacar la información detallada de la pelicula, vamos a utilizar:

`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`
Menu de categorías (solo mobile)

La versión responsive del sitio no tiene el sidebar con las 4 categorías, sino que las mismas aparecen en un menu hamburguesa.

Este menú solo va a tener los 4 íconos y nombres de cada categoría.

Descripción de la API
Tanto cuando solicitamos las peliculas de una categoría o por búsqueda de palabra clave (https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}) la respuesta que obtenemos es idéntica.

Al api nos responde con un objeto que tiene que página le pedimos, la cantidad de resultados total de la búsqueda, la cantidad de páginas que tenemos (clave para saber cuando dejar de mostrar el botón LOAD MORE) y un array en la propiedad results con todas las películas de la página:

{
  "page":1,
  "total_results":19783,
  "total_pages":990,
  "results":[
      {
        "vote_count":4394,
        "id":299537,
        "video":false,
        "vote_average":7.1,
        "title":"Captain Marvel",
        "popularity":433.107,
        "poster_path":"\/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
        "original_language":"en",
        "original_title":"Captain Marvel",
        "genre_ids":[
            28,
            12,
            878
        ],
        "backdrop_path":"\/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
        "adult":false,
        "overview":"The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
        "release_date":"2019-03-06"
      },
      { ... },
      { ... },
      ...
  ]
}
Cuando queremos consultar los datos específicos de una película (https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}), la API nos responde con un objeto que tiene todos los datos.

{
  "adult":false,
  "backdrop_path":"/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "belongs_to_collection":{
      "id":86311,
      "name":"The Avengers Collection",
      "poster_path":"/qJawKUQcIBha507UahUlX0keOT7.jpg",
      "backdrop_path":"/zuW6fOiusv4X9nnW3paHGfXcSll.jpg"
  },
  "budget":500000000,
  "genres":[
      {
        "id":12,
        "name":"Adventure"
      },
      {
        "id":878,
        "name":"Science Fiction"
      },
      {
        "id":28,
        "name":"Action"
      }
  ],
  "homepage":"https://www.marvel.com/movies/avengers-endgame",
  "id":299534,
  "imdb_id":"tt4154796",
  "original_language":"en",
  "original_title":"Avengers: Endgame",
  "overview":"After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
  "popularity":336.684,
  "poster_path":"/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "production_companies":[
      {
        "id":420,
        "logo_path":"/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
        "name":"Marvel Studios",
        "origin_country":"US"
      }
  ],
  "production_countries":[
      {
        "iso_3166_1":"US",
        "name":"United States of America"
      }
  ],
  "release_date":"2019-04-24",
  "revenue":1223641414,
  "runtime":181,
  "spoken_languages":[
      {
        "iso_639_1":"en",
        "name":"English"
      }
  ],
  "status":"Released",
  "tagline":"Part of the journey is the end.",
  "title":"Avengers: Endgame",
  "video":false,
  "vote_average":8.7,
  "vote_count":2912
}
Requerimientos
SASS
Buena organización de carpetas
Buena tabulación del código
Respetar el diseño propuesto
Fuente
font-family: 'Roboto', sans-serif;
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&amp;subset=cyrillic" rel="stylesheet">
