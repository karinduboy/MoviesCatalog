// definimos las variables globales
var apiKey = "c6f4b7af00ff89712efe89669fe19897";
var baseUrl, moviesByCategory, apiConf, totalItems, titleContainer, container;
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
        .then ( res => moviesByCategory = res.results)
};

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
    categoryList.forEach(async (category) => {
        let categoryMoviesContainer = setNode(`${category}Results`)
        await searchHomeCategoryMovies(category,categoryMoviesContainer);
    })
};

const handleSearch = () => {
    let query = event.target.value;
	if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
		lastRequest = query;
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => res.json())
			.then((res) => printQueryResults(res.results));
	}
};

const printQueryResults = (movies) => {
	const container = document.getElementById('resultsContainer');
    container.innerHTML = '';
    const searchResults = document.createElement("section")
    searchResults.classList.add("searchResults")
    const divPosters = document.createElement("div")
    divPosters.classList.add("titleContainer")

	movies.forEach((mov) => {
		let moviePoster = document.createElement('img');
		moviePoster.src = `https://image.tmdb.org/t/p/w185${mov.poster_path}`
        moviePoster.href = '#';
        moviePoster.id = mov.id
        moviePoster.classList.add("titlePoster")
        moviePoster.onclick = () => modal(mov);
        divPosters.appendChild(moviePoster)
        searchResults.appendChild(divPosters)
		container.appendChild(searchResults);
	});   
};

//modal
const modal = () => {
    let activeModal = document.getElementById('activeModal')
    activeModal.classList.remove('modal')
    activeModal.classList.add('activeModal')
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