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

const handleSearch = () => {
    let query = event.target.value;
	if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
		lastRequest = query;
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
            .then((res) => res.json())
            //.then ( (res) => console.log(res))
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
}
    
const closeModal = () => {
    let closeModal = document.getElementById('activeModal')
    closeModal.classList.remove('activeModal')
    closeModal.classList.add('modal')
}


/*
//con esto debemos poder crear los items de la home...la idea es llamar a esta función en el onload de la home
const setHomeMovieItems = (categoryList) => {
    categoryList.forEach( category => {        
        getMovieResults(category)
            .then ( (res) => {
                container = document.getElementById(`${category} Results`);
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
                movieResults => movieResults.results.slice(0,5).forEach( movieItem => {
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
                })
            }
        )
    }

*/


//menú responsive
const toggleMenu = () => {
    let leftNav = document.getElementById("leftNav")
    leftNav.classList.toggle("openLeftNav")
}

