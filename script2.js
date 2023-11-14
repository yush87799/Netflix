// api key from TMDB
const api = "api_key=0d7fcb538472b4a248392fdaf9ae8532";

// base url of the site
const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300"; // You can change "w185" to your preferred size

// requests for movies data
const requests = {
  fetchTrending: `${base_url}/trending/all/day?${api}&language=en-US`, // Change to fetch daily trending
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

// used to truncate the string
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// banner
fetch(requests.fetchTrending)
  .then((res) => res.json())
  .then((data) => {
    const setMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];

    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");

    banner.style.backgroundImage =
      "url(" + banner_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
  });

// movies rows
function fetchAndDisplayMovies(url, titleClass, postersClass) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const container = document.createElement("div");
            container.className = "row-container";

            const headrow = document.getElementById("headrow");
            headrow.appendChild(container);

            const row = document.createElement("div");
            row.className = "row";
            container.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row__title";
            title.innerText = titleClass;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = "row__poster";
                var s2 = movie.id;
                poster.id = s2;
                poster.src = img_url + movie.poster_path;
                row_posters.appendChild(poster);
            });
        });
}
  
  // Fetch and display movies for each category
  fetchAndDisplayMovies(requests.fetchNetflixOrignals, "NETFLIX ORIGINALS");
  fetchAndDisplayMovies(requests.fetchTrending, "Top Rated");
  fetchAndDisplayMovies(requests.fetchActionMovies, "Action Movies");
  fetchAndDisplayMovies(requests.fetchComedyMovies, "Comedy Movies");
  fetchAndDisplayMovies(requests.fetchHorrorMovies, "Horror Movies");
  fetchAndDisplayMovies(requests.fetchRomanceMovies, "Romance Movies");
  fetchAndDisplayMovies(requests.fetchDocumentaries, "Documentaries");
