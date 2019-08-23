// definimos las variables globales
const apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container;
var category = ''
const categoryList = ['popular','top_rated','upcoming','now_playing']

// traemos la configuracion necesaria para usar las url de la API
async function getApiConf (){
    const result = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`);
    apiConf = await result.json();
    baseUrl = await apiConf.images.base_url 
    return await baseUrl
}

//traemos la lista de las peliculas y sus detalles indicando una categoría como parámetro
async function getMovieResults (category) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    const movieResults = await response.json()
    return await movieResults
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
    categoryList.forEach( category => {        
        getMovieResults(category)
            .then (
                container = document.getElementById(`${category}Results`)
                container.innerHTML=''
                let sectionTL = document.createElement('div');
                sectionTL.classList.add('sectionTopLine')
                let sectionTitle = document.createElement('h2');
                sectionTitle.classList.add('sectionTitle')
                sectionTitle.classList.add('topLine')
                sectionTitle.innerText = category
                let viewAllLink = document.createElement('a');
                viewAllLink.classList.add('viewAllLink')
                viewAllLink.classList.add('topLine')
                viewAllLink.href = '#'
                viewAllLink.innerText = 'View All...'
                sectionTL.appendChild(sectionTitle)
                sectionTL.appendChild(viewAllLink)
                container.appendChild(sectionTL)
            )
            .then ( movieResults => movieResults.results.slice(0,5).forEach( movieItem => {
                titleContainer = document.createElement('div');
                let titlePosterContainer = document.createElement('div');
                let titlePoster = document.createElement('img');
                let titleName = document.createElement('p');
                titleContainer.classList.add('titleContainer')
                titlePosterContainer.classList.add('titlePoster')
                titlePoster.classList.add('titlePoster')
                titleName.classList.add('titleName')
                titleContainer.id = movieItem.id
                titlePoster.src = `${baseUrl}/w500/${movieItem.poster_path}`
                titleName.innerText = movieItem.title
                titlePosterContainer.appendChild(titlePoster)
                titlePosterContainer.appndChild(titleName)
                titleContainer.appendChild(titlePosterContainer)
                container.appendChild(titleContainer)
            }))
        // container.appendChild(titleContainer)
    })}
    // }
        

