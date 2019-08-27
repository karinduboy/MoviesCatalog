// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container, moviesById;
var category = '';
const categoryList = ['popular','top_rated','upcoming','now_playing'];
// var 

// traemos la configuracion necesaria para usar las url de la API 
const getApiConf = () => {
    fetch(`https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    .then ( res => res.json())
        .then( res => apiConf = res )
};

const getCategoryMovieResults = (category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then ( res => res.json())
        .then ( (res => moviesByCategory = res.results))
};


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
    let container = document.getElementById(nodeId)
    return container
};

// busca las peliculas de las categorias del home
const searchHomeCategoryMovies = (category,categoryNode) => {
	fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
		.then((res) => res.json())
        .then((res) => printCategoryResults((res.results.slice(0,5)),categoryNode));
};

// busca la info de una peli
const searchSingleMovieData = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then ((res) => res.json())
    .then ((res) =>  fillModal(res))
};

// muestra en pantalla los resultados de las categorías
const printCategoryResults = (movies,categoryNode) => {
    movies.forEach( movie => {
        let movieItem = createElement('a',[ 'titleContainer' ],movie.id,'');
        let movieImg = createElement('img',[ 'titlePoster' ]);
        movieImg.src = `${apiConf.images.base_url}/w342/${movie.poster_path}`;
        movieItem.setAttribute('onclick','modal(this.id)'); //ojo hacer funcion que asigne funcionalidad a los eventos
        let dateInfo = movie.release_date
        let onlyYear = moment(dateInfo).format("YYYY")
        let movieName = createElement('p',[ 'titleName' ],'',`${movie.title} (${onlyYear})`);
        setChilds(movieItem,[movieImg,movieName])
        setChilds(categoryNode,[movieItem])
    })
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
const setHomeMovieItems = async (categoryList) => {
    categoryList.forEach(async (category) => {
        let categoryMoviesContainer = setNode(`${category}Results`)
        await searchHomeCategoryMovies(category,categoryMoviesContainer);
    })
};

// Funcion que realiza los request del search 
const handleSearch = () => {
    let query = event.target.value;
	if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
		lastRequest = query;
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => res.json())
			.then((res) => printQueryResults(res.results));
	}
};

// funcion que imprime los resultados de la busqueda (OPTIMIZAR CON LAS FUNCIONES DE CREACION DE ELEMENTOS)
const printQueryResults = (movies, query) => {
	let container = setNode('resultsContainer');
    container.innerHTML = '';
    let searchResults = createElement('section',['searchResults'])
	movies.forEach((mov) => {
        let divPoster = createElement('a',['titleContainer'],mov.id)
        divPoster.href = '#';
        let moviePoster = createElement('img',['titlePoster'])
        moviePoster.src = `${apiConf.images.base_url}/w342/${mov.poster_path}`
        moviePoster.setAttribute('onclick','modal(this.id)')
        let dateInfo = mov.release_date
        let onlyYear = moment(dateInfo).format("YYYY")
        let movieTitle = createElement('p',['titleName'],'',`${mov.title} (${onlyYear})`)
        setChilds(divPoster,[moviePoster,movieTitle])
        setChilds(searchResults,[divPoster])
        setChilds(container,[searchResults])
	});   
};


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
    leftNav.classList.toggle("openLeftNav")
    leftNav.classList.toggle('closed')
};

//inicializamos el home
const initialize = async() => {
    await getApiConf();
    setHomeMovieItems(categoryList);
};