const watchListContainer = document.getElementById("watchlist-container")
const myWatchListLink = document.getElementById("watchlist-link-container")
let storedDataArray = [] // retrieve the stored array from the local Storage
const length = 144
let watchlistHtml =''
let watchlistArray = []
const placeholderHtml = `
    <div class="placeholder-container2">
        <p class="placeholder-watch-message">Your watchlist is looking a little empty...</p>

        <a href="index.html">
        <div class="add-movies-link">
            <img class="add-icon" src="icons/add-icon.png">
            <p>Let's add some movies!</p>
        </div>
        </a>    
    </div>`

function setWatchlistHtml() {
    storedDataArray = JSON.parse(localStorage.getItem("addToWatchlistArray"))
    if(storedDataArray.length) {
        watchlistHtml = storedDataArray.map(function(movie) {
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
                                    <img class="delete-icon" id="delete-movie" data-movie-item=${imdbID} src="icons/delete-icon.png">
                               </div>
                           </div>
       
                           <p class="movie-plot">${Plot.substring(0, Math.min(length, Plot.length))}...</p>
       
                       </div>
                   </div>
            `
        }).join('')
    
        renderWatchList(watchlistHtml)
        console.log(storedDataArray)

    } else if (!storedDataArray.length) {
        renderWatchList(placeholderHtml)
    }
       
}

setWatchlistHtml()

function renderWatchList(watchlistHtml) {
    console.log(watchlistHtml)
    watchListContainer.innerHTML = watchlistHtml 
}


//Listen for the delete-button clicks
document.addEventListener("click", function(e){  
    if(e.target.dataset.movieItem) {
        handleDelBtn(e.target.dataset.movieItem)   
    }
    
})

function handleDelBtn(btnId) {
    watchlistArray = JSON.parse(localStorage.getItem("addToWatchlistArray"))
    for(movie of watchlistArray) { 
        if(btnId == movie.imdbID) {
            let movieIndex = watchlistArray.indexOf(movie)
            watchlistArray.splice(movieIndex,1)
            localStorage.setItem("addToWatchlistArray", JSON.stringify(watchlistArray))
            setWatchlistHtml()
        }
    }   
}

