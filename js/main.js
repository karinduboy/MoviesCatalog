// definimos las variables globales
const apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems;
var category = ''
const categories = ['popular','top_rated','upcoming','now_playing']

// traemos la configuracion necesaria para usar las url de la API
async function getApiConf (){
    const result = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    const apiConf = await result.json()    
    return apiConf
}

//traemos la lista de las peliculas y sus detalles indicando una categoría como parámetro
async function getMovieResults (category) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    const movieResults = await response.json()
    return movieResults
}

const setConfVars = () => {
    getApiConf()
    .then( res = () => {
        baseUrl = res.base_url
        return baseUrl
    })
}

//con esto debemos poder crear los items de la home...la idea es llamar a esta función en el onload de la home
const setHomeMovieItems = (categoryList) => {
    // debugger;
    categoryList.forEach( category = () => {
        let container = document.getElementById(`${category}Results`)
        let sectionTL = document.createElement('div');
        sectionTL.classList.add('sectionTopLine')
        let sectionTitle = document.createElement('h2');
        sectionTitle.classList.add('sectionTitle')
        sectionTitle.classList.add('topLine')
        let viewAllLink = document.createElement('a');
        viewAllLink.classList.add('viewAllLink')
        viewAllLink.classList.add('topLine')
        viewAllLink.href = '#'
        viewAllLink.innerText = 'View All...'
        moviesByCategory = getMovieResults(category)
            .then (moviesByCategory.results.slice(0,5).forEach( movieItem = () => {
                console.log(movieItem)
                // let titleContainer = document.createElement('div');
                // let titlePosterContainer = document.createElement('div')
                // let titlePoster = document.createElement('img')
                // let titleName = document.createElement('p')
                // titleContainer.classList.add('titleContainer')
                // titlePosterContainer.classList.add('titlePoster')
                // titlePoster.classList.add('titlePoster')
                // titleName.classList.add('titleName')
                // titleContainer.id = movieItem.id
                // titlePoster.src = `${apiConf.base_url}/w500/${movieItem.poster_url}`
                // titleName.innerText = movieItem.name
                // titlePosterContainer.appendChild(titlePoster)
                // titlePosterContainer.appendChild(titleName)
                // titleContainer.appendChild(titlePosterContainer)
                // container.appendChild(titleContainer)
            }))
    })
}
