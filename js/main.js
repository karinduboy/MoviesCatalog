// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container;
var category = '';
const categoryList = ['popular','top_rated','upcoming','now_playing'];
// var 


const getApiConf = () => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then ( res => res.json())
        .then( res => apiConf = res )
};

const getCategoryMovieResults = (category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then ( res => res.json())
        .then ( res => moviesByCategory = res.results)
};
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
};

const setChilds = (father, childList) => {
    childList.forEach( (child) => {father.appendChild(child)})
};

const setNode = (nodeId) => {
    let container = document.getElementById(nodeId)
    return container
};

const searchHomeCategoryMovies = (category,categoryNode) => {
	fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
		.then((res) => res.json())
		.then((res) => printCategoryResults((res.results.slice(0,5)),categoryNode));
};

const printCategoryResults = (movies,categoryNode) => {
    movies.forEach( movie => {
        let movieItem = createElement('a',[ 'titleContainer' ],movie);
        let movieImg = createElement('img',[ 'titlePoster' ]);
        movieImg.src = `${apiConf.images.base_url}/w342/${movie.poster_path}`;
        let movieName = createElement('p',[ 'titleName' ],'',movie.title);
        setChilds(movieItem,[movieImg,movieName])
        setChilds(categoryNode,[movieItem])
    })
};

const setHomeMovieItems = async (categoryList) => {
    // let container = setNode('homeResultsContainer')
    // container.innerHTML='';
    categoryList.forEach(async (category) => {
        let categoryMoviesContainer = setNode(`${category}Results`)
        await searchHomeCategoryMovies(category,categoryMoviesContainer);
    })
};

const initialize = async() => {
    await getApiConf();
    setHomeMovieItems(categoryList);
};