const searchForm = document.getElementById("search-container")
const searchBar = document.getElementById("search-bar")
const searchButton = document.getElementById("search-btn")
const movieListContainer = document.getElementById("movie-list-container")
let moviesArray = [] // for adding & displaing the movie items on the index.html screen
let moviesStorageArray = [] // store all the user's searched movies
let addToWatchlistArray = localStorage.getItem("addToWatchlistArray") ? 
                            JSON.parse(localStorage.getItem("addToWatchlistArray")) : [] // here will add movies added by the user
let moviesHtml = ''
const moviePlotlength = 144


searchForm.addEventListener("submit", function(e) {
    moviesArray = [] // remove the old searched data from the array and from the screen
    e.preventDefault()
    searchAllMovies()
    searchForm.reset()
})


function searchAllMovies() {
    if(searchBar.value) {
        fetch(`http://www.omdbapi.com/?apikey=fb9fa955&s=${searchBar.value}`)
            .then(response => response.json())
            .then(data => {searchMovie(data.Search)})
            .catch(error => {
                movieListContainer.innerHTML = `
                <div class="not-found-container">
                    <p class="not-found-message">Unable to find what you're looking for... Please try another search.</p>   
                </div>`
            })
    }
    
}

function searchMovie(moviesData) {
    for(item of moviesData) {
        fetch(`http://www.omdbapi.com/?apikey=fb9fa955&t=${item.Title}`)
            .then(response => response.json())
            .then(data => {
                moviesArray.unshift(data)
                moviesStorageArray.unshift(data)
                setMoviesHtml()          
            })
    }   
}

function setMoviesHtml() {
    
    moviesHtml = moviesArray.map(function(movie) {
        const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = movie
        return `
        <div class="movie-item" id=${imdbID}>
                   <img class="movie-poster" src="${Poster}">
   
                   <div class="movie-info">
                       <div class="movie-antet">
                           <p class="movie-title">${Title}</p>
                           <i class="fa-solid fa-star" style="color: #e6c51e;"></i>
                           <p class="movie-rating">${imdbRating}</p>
                       </div>
   
                       <div class="extra-info">
                           <p class="movie-runtime">${Runtime}</p>
                           <p class="movie-genre">${Genre}</p>
                           <div id="add-icon-container">
                                <img class="add-icon" id="add-movie" data-movie-item=${imdbID} src="icons/add-icon.png" alt="a white round symbol with a plus sign inside">
                           </div>
                       </div>
   
                       <p class="movie-plot">${Plot.substring(0, Math.min(moviePlotlength, Plot.length))}...</p>
   
                   </div>
               </div>
        `
    }).join('')
    
    renderMovies(moviesHtml)
}

function renderMovies(stringHtml) {
    movieListContainer.innerHTML = stringHtml
}


// Listen for the add-button clicks
document.addEventListener("click", function(e){  
    if(e.target.dataset.movieItem) {
        handleAddBtn(e.target.dataset.movieItem)
        e.target.parentElement.innerHTML = `<img class="added-symbol" src="icons/added-mark.png" alt="a green rounded symbol with a check mark inside">`  
        addToLocalStorage(addToWatchlistArray)   
    }
    
})

function handleAddBtn(btnId) {
    for(movie of moviesStorageArray) { 
        /*here I check if the movie has the same id as the clicked btn and 
        if the movie item already exists or not in the addToWatchlistArray*/
        if(btnId == movie.imdbID && !addToWatchlistArray.some(m => m.imdbID == btnId)) {
            addToWatchlistArray.unshift(movie)
        }
    }
    return addToWatchlistArray
}

function addToLocalStorage(array) {
    localStorage.setItem("addToWatchlistArray", JSON.stringify(array))
}

