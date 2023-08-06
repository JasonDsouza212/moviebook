const apiKey = "ad07eb"; // Your OMDb API key
const moviesGrid = document.getElementById("moviesGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchMovieData(searchTerm);
    }
});

async function fetchMovieData(searchTerm) {
    moviesGrid.innerHTML = "";

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Search) {
            data.Search.forEach(movie => {
                const movieCard = createMovieCard(movie);
                moviesGrid.appendChild(movieCard);
            });
        } else {
            moviesGrid.innerHTML = "<p>No movies found.</p>";
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        moviesGrid.innerHTML = "<p>Oops! Something went wrong.</p>";
    }
}

function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const poster = movie.Poster === "N/A" ? "https://via.placeholder.com/300" : movie.Poster;
    const movieDetails = `
        <img src="${poster}" alt="${movie.Title}" class="movie-poster">
        <div class="movie-details">
            <h2 class="movie-title">${movie.Title}</h2>
            <p class="movie-year">${movie.Year}</p>
        </div>
    `;

    movieCard.innerHTML = movieDetails;

    return movieCard;
}

// Initially load with default search term (e.g., "Avengers")
fetchMovieData("Avengers");

















// Your existing JavaScript code here

// const navbarHamburger = document.querySelector('.navbar-hamburger');
// const navbarMenu = document.querySelector('.navbar-menu');
// const navbarMobile = document.querySelector('.navbar-mobile');

// navbarHamburger.addEventListener('click', () => {
//   navbarHamburger.classList.toggle('active');
//   navbarMenu.classList.toggle('active');
//   navbarMobile.classList.toggle('active');
// });
