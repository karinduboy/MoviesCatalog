// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container;
var category = '';
const categoryList = ['popular','top_rated','upcoming','now_playing'];
var resultType = ['Home','Query','Category']
// var 

// traemos la configuracion necesaria para usar las url de la API 
const getApiConf = () => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then ( res => res.json())
        .then( res => apiConf = res )
};

const getCategoryMovieResults = (category,node,resultsType) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then ( res => res.json())
        .then ( moviesByCategory => printCategoryResults(moviesByCategory,node,resultsType))
};

// FUNCIONES UTILITARIAS
// FU: creacion de elementos en pantalla
const createElement = (tag,elemClasses,elementId='',text='') => {
    let element = document.createElement(tag);
    elemClasses.forEach( eClass => element.classList.add(eClass))
    element.id = elementId
    element.innerText = text
    return element
};

//FU: appendea hijos a los elementos
const setChilds = (father, childList) => {
    childList.forEach( (child) => {father.appendChild(child)})
};

//FU: setear el nodo de  la pantalla donde se crearán los elementos 
const setNode = (nodeId) => {
    let container = document.getElementById(nodeId)
    return container
};

// busca las peliculas de las categorias del home
const searchHomeCategoryMovies = (category,categoryNode,resultType) => {
	fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
		.then((res) => res.json())
		.then((res) => printCategoryResults(res,categoryNode,resultType));
};

// busca la info de una peli
const searchSingleMovieData = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then ((res) => res.json())
    .then ((res) => console.log(res))
};

// const fillModal = (movie) => {
//     let container = setNode('modalMovieTitle');
//     let modalTitle = createElement('p',['modalTitle'],'',movie.title)
//     // setChilds()
// }

// muestra en pantalla los resultados de las categorías
const printCategoryResults = (movies,categoryNode,resultType) => {
    // setTopLine(movies,categoryNode,resultType)
    debugger;
    var movieItems = ( resultType === 'Home' ) ? ( movies.results.slice(0,5) ) : ( movies.results );
    movieItems.forEach( movie => {
        let movieItem = createElement('a',[ 'titleContainer' ],movie.id);
        let movieImg = createElement('img',[ 'titlePoster' ]);
        movieImg.src = `${apiConf.images.base_url}/w342/${movie.poster_path}`;
        movieItem.setAttribute('onclick','modal(this.id)'); //ojo hacer funcion que asigne funcionalidad a los eventos
        let movieName = createElement('p',[ 'titleName' ],'',movie.title);
        setChilds(movieItem,[movieImg,movieName])
        setChilds(categoryNode,[movieItem])
    })
};

// muestra los elementos del home
const setHomeMovieItems = async (categoryList) => {
    categoryList.forEach(async (category) => {
        let categoryMoviesContainer = setNode(`${category}Results`)
        await searchHomeCategoryMovies(category,categoryMoviesContainer,'Home');
    })
};

const setCategoryMovieItems = async (category,containerId) => {
    let container = setNode(containerId);
    await getCategoryMovieResults(category,container,'Category')
}

// Funcion que realiza los request del search 
const handleSearch = () => {
    let query = event.target.value;
	if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
		lastRequest = query;
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => res.json())
			.then((res) => printQueryResults(res.results,query));
	};
};

// funcion que imprime los resultados de la busqueda (OPTIMIZAR CON LAS FUNCIONES DE CREACION DE ELEMENTOS)
const printQueryResults = (movies) => {
	let container = setNode('resultsContainer');
    container.innerHTML = '';
    let searchResults = createElement('section',['searchResults']);
    // let topLinecontainer = createElement ('div',['topLine'],'',movies.)
	movies.forEach((mov) => {
        let divPoster = createElement('a',['titleContainer'],mov.id);
        divPoster.href = '#';
        let moviePoster = createElement('img',['titlePoster']);
		moviePoster.src = `${apiConf.images.base_url}/w342/${mov.poster_path}`;
        let movieTitle = createElement('p',['titleName'],'',mov.title);
        moviePoster.setAttribute('onclick',`modal(this.id)`)
        setChilds(divPoster,[moviePoster,movieTitle])
        setChilds(searchResults,[divPoster])
        setChilds(container,[searchResults])
	})
};

//modal
const modal = async (movieId) => {
    let activeModal = document.getElementById('activeModal')
    activeModal.classList.remove('modal')
    activeModal.classList.add('activeModal')
    await searchSingleMovieData(movieId);
};
    
const closeModal = () => {
    let closeModal = document.getElementById('activeModal')
    closeModal.classList.remove('activeModal')
    closeModal.classList.add('modal')
};

//menú responsive
const toggleMenu = () => {
    let leftNav = document.getElementById("leftNav")
    leftNav.classList.toggle("openLeftNav")
};

//inicializamos el home
const initialize = async() => {
    await getApiConf();
    setHomeMovieItems(categoryList);
};