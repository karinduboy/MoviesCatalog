// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container;
var category = ''
const categoryList = ['popular','top_rated','upcoming','now_playing']
// var 


const getApiConf = () => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then ( res => res.json())
        .then( res => apiConf = res )
}

const getCategoryMovieResults = (category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then ( res => res.json())
        .then ( res => moviesByCategory = res.results)
}
// const setConfVars = async(apiConf) = {
//     baseUrl = await apiConf.images.base_url
//     return baseUrl
// }

const createElement = (tag,elemClasses,elementId='',text='') => {
    let element = document.createElement(tag);
    elemClasses.forEach( eClass => element.classList.add(eClass))
    element.id = elementId
    element.innerText = text
    return element
}

const setChilds = (father, childList) => {
    childList.forEach( (child) => {father.appendChild(child)})
}

const setNode = (nodeId) => {
    let container = document.getElementById(nodeId)
    return container
}

const setHomeMovieItems = async (categoryList) => {
    let container = setNode('homeResultsContainer')
    container.innerHTML='';
    categoryList.forEach(async (category) => {
        let movies = await getCategoryMovieResults(category);
        let categoryContainer = createElement('section',['sectionContainer'],`${category}Results`);
        let categoryMoviesContainer = createElement('div',['firstTitles'])
        let topLineContainer = createElement ('div',['sectionTopLine'])
        let sectionTitle = createElement('p',['sectionTitle','topLine'],'',category)
        let viewAllLink = createElement('a',['viewAllLink','topLine'],'','View All...')
        setChilds(topLineContainer,[sectionTitle,viewAllLink])
        setChilds(categoryContainer,[topLineContainer,categoryMoviesContainer])
        console.log(movies) //para comprobar si en algún momento trae el resultado de las pelis pero tira undefined siempre, por eso no agarra el foreach
        // movies.slice(0, 5).forEach( (movie) => {
        //     let movieItem = createElement('a',[ 'titleContainer' ],movie);
        //     let movieImg = createElement('img',[ 'titlePoster' ]);
        //     movieImg.src = `${apiConf.images.base_url}/w342/${movie.poster_path}`;
        //     let movieName = createElement('p',[ 'titleName' ],'',movie.title);
        //     setChilds(movieItem,[movieImg,movieName])
        //     setChilds(categoryMoviesContainer,[movieItem])
        // })
        setChilds(container,[categoryContainer])
    })
}

const initialize = async() => {
    await getApiConf();
    setHomeMovieItems(categoryList)
}