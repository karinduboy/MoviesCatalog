//menú hamburguesa
const toggleMenu = () => {

    let leftNav = document.getElementById("leftNav")
        leftNav.classList.toggle("openLeftNav")
}

// definimos las variables globales
const apiKey = "c6f4b7af00ff89712efe89669fe19897";
let baseUrl,moviesByCategory, apiConf, totalItems;
let category = ''
let categories = ['popular','top_rated','upcoming','now_playing',]

// traemos la configuracion necesaria para usar las url de la API
const getApiConf = () => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
        .then( response => response.json() )
        .then( apiConf => console.log(apiConf) )
    return apiConf
}
//traemos la lista de las peliculas y sus detalles indicando una categoría como parámetro
const getMovieResults = (category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
        .then( response => response.json() )
        .then( res => moviesByCategory = res.results )
    return moviesByCategory
}

//con esto debemos poder crear los items de la home...la idea es llamar a esta función en el onload de la home
const setMovieItems = (category, totalItems) => {
    let container = document.getElementById(`${category}Results`)
    let movieItems = getMovieResults(category)
    // for(i=0; ) SE ME OLVIDO LA SINTAXIS DEL FOR, INVESTIGANDO
}
