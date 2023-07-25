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
    await getMovies()
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
    await getId(1)
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

// Calling Create Movie
(async () => {
    const movieObject = {
        title: "Freddie ",
        genre: "Scary",
        rating: "4",
    };

    await createMovie(movieObject);
})()



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

//Calling Editing Movie
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

// Calling Delete Movie
(async ()=> {
   await deleteMovie(0)
})()


