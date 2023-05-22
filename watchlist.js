const watchListContainer = document.getElementById("watchlist-container")
const myWatchListLink = document.getElementById("watchlist-link-container")
const moviePlotlength = 144
let watchlistHtml =''
const placeholderHtml = `
    <div class="movie-list-placeholder-container">
        <p class="placeholder-watch-message">Your watchlist is looking a little empty...</p>

        <a href="index.html">
        <div class="add-movies-link">
            <img class="add-icon" src="icons/add-icon.png">
            <p>Let's add some movies!</p>
        </div>
        </a>    
    </div>`

function setWatchlistHtml() {
     // retrieve the stored array from the local Storage
    let storedDataArray = localStorage.getItem("addToWatchlistArray") ? JSON.parse(localStorage.getItem("addToWatchlistArray")) : []
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
                                    <img class="delete-icon" id="delete-movie" data-movie-item=${imdbID} src="icons/delete-icon.png" alt="a red rounded symbol with an x sign inside.">
                               </div>
                           </div>
       
                           <p class="movie-plot">${Plot.substring(0, Math.min(moviePlotlength, Plot.length))}...</p>
       
                       </div>
                   </div>
            `
        }).join('')
    
        renderWatchList(watchlistHtml)


    } else if (!storedDataArray.length) {
        renderWatchList(placeholderHtml)
    }
       
}

setWatchlistHtml()

function renderWatchList(watchlistHtml) {
    watchListContainer.innerHTML = watchlistHtml 
}


//Listen for the delete-button clicks
document.addEventListener("click", function(e){  
    if(e.target.dataset.movieItem) {
        handleDelBtn(e.target.dataset.movieItem)   
    }
    
})

function handleDelBtn(btnId) {
    let watchlistArray = JSON.parse(localStorage.getItem("addToWatchlistArray"))
    for(movie of watchlistArray) { 
        if(btnId == movie.imdbID) {
            let movieIndex = watchlistArray.indexOf(movie)
            watchlistArray.splice(movieIndex,1)
            localStorage.setItem("addToWatchlistArray", JSON.stringify(watchlistArray))
            setWatchlistHtml()
        }
    }   
}

