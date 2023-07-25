"use strict";
// URL
const DOMAIN = 'http://localhost:3000';

console.log(DOMAIN)

const url = `https://api.themoviedb.org/3/movie/157336?api_key=${MOVIE_KEY}`

console.log(url)

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `token ${MOVIE_KEY}`
    }
};

fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));






// Get All Movies
const getMovies = async () => {
    const response = await fetch(`${DOMAIN}/movies`);
    console.log(response);
    const movies = await response.json();
    console.log(movies);
    return movies;
};

//Calling Get All Movies
(async () => {
   let results = await getMovies();
    console.log(results);
    const movies = results.results;
    console.log(movies);
    const moviesRows = results.map((movie) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex gap-10 align-center">
                    <img class="character-image" src="https://via.placeholder.com/50x50">
                    <p class="character-name">${movie.title}</p>
                </div>
            </td>
            <td>${movie.genre}</td>
            <td>${movie.id}</td>
            <td><button>delete</button></td>
        `
        let button = row.querySelector('button');
        button.addEventListener('click', ()=>{
            row.remove();
        });
        return row;
    });
    for(let movie of moviesRows) {
        document.querySelector('#characters tbody').appendChild(movie);
    }
})();


// Get a Specific Movie
const getId = async (id) => {
    const response = await fetch(`${DOMAIN}/movies/${id}`);
    console.log(response);
    const movies = await response.json();
    console.log(movies);
    return movies;
};

// Calling Specific Movie

(async () => {
    await getId(3)
})();


// Create a Movie
const createMovie = async (movie) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    };
    const response = await fetch(`${DOMAIN}/movies`, options);
    console.log(response);
    const apiResponse = response.json();
    console.log(apiResponse);
    return apiResponse;
};

// // Calling Create Movie
// (async () => {
//     const movieObject = {
//         title: "Freddie ",
//         genre: "Scary",
//         rating: "4",
//     };
//
//     await createMovie(movieObject);
// })()



// Edit Movie
const editMovie = async (movie) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    };
    const response = await fetch(`${DOMAIN}/movies/${movie.id}`, options);
    console.log(response);
    const apiResponse = response.json();
    console.log(apiResponse);
    return apiResponse;
};

// Calling Editing Movie
(async () => {
    const editMovieUpdate = {
        id: 3,
        title: "Freddie ",
        genre: "Scary",
        rating: "4",
    }
    await editMovie(editMovieUpdate);
})()



// Delete Movie
const deleteMovie = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`${DOMAIN}/movies/${id}`, options);
    console.log(response);
    const apiResponse = response.json();
    console.log(apiResponse);
    return apiResponse;
};

// Calling Delete Movie (Don't Use)
// (async ()=> {
//    await deleteMovie(4)
// })()


