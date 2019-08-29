// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container, moviesById;
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

// const getCategoryMovieResults = (category,node,resultsType) => {
//     fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
//     .then ( res => res.json())
//         .then ( moviesByCategory => printResults(moviesByCategory,node,resultsType,'',category))
// };


// FUNCIONES UTILITARIAS
// FU: creacion de elementos en pantalla
const createElement = (tag,elemClasses,elementId='',text) => {
    let element = document.createElement(tag);
    elemClasses.forEach( eClass => element.classList.add(eClass))
    element.id = elementId
    element.innerText = `${text}`
    return element
};

//FU: appendea hijos a los elementos
const setChilds = (father, childList) => {
    childList.forEach( (child) => {father.appendChild(child)})
};

//FU: setear el nodo de  la pantalla donde se crearán los elementos 
const setNode = (nodeId) => {
    let container = document.getElementById(nodeId);
    container.innerHTML=''
    return container
};

// FUNCIONES PARA FETCH
// busca las peliculas de las categorias del home
const getCategoryMovies = (category,categoryNode,resultType) => {
	fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
		.then((res) => res.json())
		.then((res) => printResults(res,categoryNode,resultType,'',category));
};

// busca la info de una peli
const searchSingleMovieData = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then ((res) => res.json())
    .then ((res) =>  fillModal(res))
};

// busca las pelis por lo indicado en el input
const getQueryResults = (query,node) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => res.json())
			.then((movies) => printResults(movies,node,'Query',query));
}
// var resultTypeVars = {
//     Home:{
//         resultType: 'Home',
//         fetchDir: `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`,
//         categoryNodeClass: 'firstTitles',
//         linkText: 'View All...',
//         linkAction: `searchHomeCategoryMovies(category,categoryNode,'Category')`,
//         topLineText: {
//             popular: 'Popular Movies',
//             top_rated: 'Top Rated Movies',
//             upcoming: 'Upcoming Movies',
//             now_playing: 'Now Playing Movies'
//         },
//         movieItems: movies.results.slice(0,5),
//         query:'',
//         page: ''
//     },
//     Category:{
//         resultType: 'Category',
//         fetchDir: `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`,
//         categoryNodeClass: 'searchResults',
//         linkText: `See all (${movies.total_results}) results`,
//         linkAction: `searchMovies(category,categoryNode,'Category')`,
//         topLineText: {
//             popular: 'Popular Movies',
//             top_rated: 'Top Rated Movies',
//             upcoming: 'Upcoming Movies',
//             now_playing: 'Now Playing Movies'
//         },
//         movieItems: movies.results,
//         query: '',
//         page: `${movies.page}`
//     },
//     Query:{
//         resultType: 'Query',
//         fetchDir: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
//         categoryNodeClass: 'searchResults',
//         linkText: `See all (${movies.total_results}) results`,
//         linkAction: `searchMovies(category,categoryNode,'Category')`,
//         topLineText:`Movies for: "${query}..."`,
//         movieItems: movies.results,
//         query: '',
//         page: `${movies.page}`
//     }
// };

const setTopLineResult = (totalResults,categoryNode,topLineText,page,resultType,query,category) => {
    let linkText = (resultType === 'Home') ? 'View All...' : `${totalResults}`;
    let onclickAction = ( resultType === 'Home') ? `setMovieItems(${category},${categoryNode},${resultType})` : `setMovieItems(${query},${categoryNode},${resultType})`;
    let sectionContainer = createElement('section',['sectionContainer']);
    let topLineContainer = createElement('div',['sectionTopLine']);
    let sectionName = createElement('h2',['sectionTitle','topLine'],page,topLineText);
    let viewAllLink = createElement('a',['viewAllLink','topLine'],'',linkText);
    viewAllLink.href = '#'
    viewAllLink.setAttribute('onclick',onclickAction)
    setChilds(topLineContainer,[sectionName,viewAllLink])
    setChilds(sectionContainer,[topLineContainer])
    setChilds(categoryNode,[sectionContainer])
};

// const setMovieItems = (criteria,categoryNode,resultType) = {

// }

// muestra en pantalla los resultados de la busqueda (Home, Categoría y Query)
const printResults = (movies,node,resultType,query,category) => {
    let aditionalClass =  (resultType === 'Home') ? 'firstTitles' : 'searchResults';
    let resultsContainer = createElement('div',[`${category}Results`,aditionalClass]);
    setChilds(node,[resultsContainer])
    let topLineText = (query === '' || query) ? `Movies for: "${category}..."`: `Movies with: ${query}...`;
    setTopLineResult(movies.totalItems,node,topLineText,movies.page,resultType,query,category)
    var movieItems = ( resultType === 'Home' ) ? ( movies.results.slice(0,5) ) : ( movies.results );
    printMovieItems(movieItems,node)
};

const printMovieItems = (movieItems, categoryNode) =>{
    movieItems.forEach( movie => {
        let movieItem = createElement('a',[ 'titleContainer' ],movie.id);
        let movieImg = createElement('img',[ 'titlePoster' ]);
        movieImg.src = `${apiConf.images.base_url}/w342/${movie.poster_path}`;
        movieItem.setAttribute('onclick','modal(this.id)'); //ojo hacer funcion que asigne funcionalidad a los eventos
        let dateInfo = movie.release_date;
        let onlyYear = moment(dateInfo).format("YYYY");
        let movieTitle = createElement('p',['titleName'],'',`${movie.title} (${onlyYear})`);
        setChilds(movieItem,[movieImg,movieTitle])
        setChilds(categoryNode,[movieItem])
    });
};

const fillModal = (movie) => {
    let container = setNode('modalMovieTitle');
    container.innerHTML = ''
    let detailsContainer = setNode('detailsSection')
    detailsContainer.innerHTML = ''
    backImageContainer = ''
    let dateInfo = movie.release_date
    let formatDate = moment(dateInfo).format("MMM Do YY")
    let onlyYear = moment(dateInfo).format("YYYY")
    let modalTitle = createElement('p',['modalTitle'],'',`${movie.title} (${onlyYear})`)
    let subtitle = createElement('span',["modalSubtitle"],'',movie.tagline)
    let summary = createElement('p',['summary'],'',movie.overview)
    let releaseDate = createElement('p',['modalText'],'',formatDate)
    let rating = createElement('p',['rating'],'',movie.vote_average)
    let poster = `https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`
    let modalPoster
    modalPoster = document.getElementById("modalPoster").src=(poster)
    let backImage = document.getElementById('backImage').src=(`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`)
    setChilds(container, [modalTitle])
    setChilds(container, [subtitle])
    setChilds(detailsContainer, [summary])
    let genreP = createElement('p',['modalColorTitles'],'',`Genres: `)
    setChilds(detailsContainer, [genreP])
    movie.genres.forEach(gen => {
        let genres = createElement('p',['modalText'],'',`${gen.name}. `)
        setChilds(detailsContainer, [genres])
    })
    let releaseP = createElement('p',['modalColorTitles'],'',`Release date: `)
    setChilds(detailsContainer, [releaseP])
    setChilds(detailsContainer, [releaseDate])
    setChilds(container, [rating])
    setChilds(container, [modalPoster])
    setChilds(detailsContainer, [backImage])
    
}

// muestra los elementos del home
// FUNCIONES DE SETEO
// setea la carga de los elemento del home
const setHomeMovieItems = async (categoryList) => {
    var resultsContainer = setNode('resultsContainer');
    categoryList.forEach(async (category) => {
        // let sectionContainer = createElement('section',['sectionContainer']);
        // setChilds(resultsContainer,[sectionContainer])
        await getCategoryMovies(category,resultsContainer,'Home');
    })
};

// setea los elementos de cada categoría
const setCategoryMovieItems = async (category,containerId) => {
    let container = setNode(containerId);
    await getCategoryMovies(category,container,'Category')
}

// Funcion que llama a los fetch del search 
const handleSearch = async () => {
    let query = event.target.value;
    let container = setNode('serachResult')
	if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
		lastRequest = query;
		await getQueryResults(query,node)
	};
};
/*
//funcion que imprime los resultados de la busqueda (OPTIMIZAR CON LAS FUNCIONES DE CREACION DE ELEMENTOS)
const printQueryResults = (movies,categoryNode,resultType,query,category) => {
 	let container = setNode('resultsContainer');
     let searchResults = createElement('section',['searchResults']);
     setChilds(container,[searchResults])
     let topLineText = `Movies for: "${query}..."`;
     setTopLineResult(movies.totalResults,searchResults,topLineText,page,query)
 	printMovieItems(movies,categoryNode)
};*/

//modal
const modal = (movieId) => {
    let activeModal = document.getElementById('activeModal')
    activeModal.classList.remove('modal')
    activeModal.classList.add('activeModal')
    searchSingleMovieData(movieId);
};
    
const closeModal = () => {
    let closeModal = document.getElementById('activeModal')
    closeModal.classList.remove('activeModal')
    closeModal.classList.add('modal')
};

//menú responsive
const toggleMenu = () => {
    let leftNav = document.getElementById("leftNav")
    leftNav.classList.toggle("open")
    leftNav.classList.toggle("closed")
};

const closeMenu = () => {
    let leftNav = document.getElementById("leftNav")
    if (leftNav.classList.contains("open")) {
      toggleMenu()
    }
  }

//inicializamos el home
const initialize = async() => {
    await getApiConf();
    setHomeMovieItems(categoryList);
};