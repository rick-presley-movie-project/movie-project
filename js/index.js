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
            <td>${movie.rating}</td>
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


// // Create a Movie
// $(document).ready(function() {
//     // Event listener for form submission
//     $("#movieForm").submit(function(event) {
//         event.preventDefault(); // Prevent default form submission
//
//         // Get movie data from the form
//         const movieObject = {
//             title: $("#title").val(),
//             genre: $("#genre").val(),
//             rating: $("#rating").val()
//         };
//
//         // AJAX POST request to send movie data to the server
//         $.ajax({
//             url: `${DOMAIN}/movies`, // Replace DOMAIN with your server endpoint
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify(movieObject),
//             success: function(response) {
//                 // Handle the successful response from the server
//                 console.log("Movie added successfully!");
//                 console.log(response);
//
//                 // Render the new movie in the movieList div
//                 const movieListItem = $("<div>").text(
//                     `Title: ${response.title}, Genre: ${response.genre}, Rating: ${response.rating}`
//                 );
//                 $("#movieList").append(movieListItem);
//
//                 // Clear the form fields after successful submission
//                 $("#title").val("");
//                 $("#genre").val("");
//                 $("#rating").val("");
//             },
//             error: function(error) {
//                 // Handle errors, if any
//                 console.error("Error adding movie:", error);
//             }
//         });
//     });
// });
$(document).ready(function() {
    function renderMovieList() {
        $.ajax({
            url: `${DOMAIN}/movies`,
            type: "GET",
            success: function(response) {
                // Clear the table body before rendering the updated list
                $("#characters tbody").empty();

                response.forEach(function(movie) {
                    const movieRow = $("<tr>").append(
                        $("<td>").text(movie.title),
                        $("<td>").text(movie.genre),
                        $("<td>").text(movie.id),
                        $("<td>").text(movie.rating),
                        $("<td>").append(
                            $("<button>")
                                .text("Delete")
                                .click(function() {
                                    deleteMovie(movie.id);
                                })
                        ),
                    );

                    $("#characters tbody").append(movieRow);
                });
            },
            error: function(error) {
                console.error("Error fetching movies:", error);
            }
        });
    }

    $("#movieForm").submit(function(event) {
        event.preventDefault();

        const movieObject = {
            title: $("#title").val(),
            genre: $("#genre").val(),
            rating: $("#rating").val()
        };

        $.ajax({
            url: `${DOMAIN}/movies`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(movieObject),
            success: function(response) {
                console.log("Movie added successfully!");
                console.log(response);

                // Fetch and render the updated list of movies after a new movie is added
                renderMovieList();

                $("#title").val("");
                $("#genre").val("");
                $("#rating").val("");
            },
            error: function(error) {
                console.error("Error adding movie:", error);
            }
        });
    });

    renderMovieList();

    function deleteMovie(movieId) {
        $.ajax({
            url: `${DOMAIN}/movies/${movieId}`, // Replace with the actual endpoint for deleting a movie by ID
            type: "DELETE",
            success: function(response) {
                console.log("Movie deleted successfully!");

                // Fetch and render the updated list of movies after a movie is deleted
                renderMovieList();
            },
            error: function(error) {
                console.error("Error deleting movie:", error);
            }
        });
    }
});










// const createMovie = async (movie) => {
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(movie)
//     };
//     const response = await fetch(`${DOMAIN}/movies`, options);
//     console.log(response);
//     const apiResponse = response.json();
//     console.log(apiResponse);
//     return apiResponse;
// };

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



// // Delete Movie-- no use
// const deleteMovie = async (id) => {
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const response = await fetch(`${DOMAIN}/movies/${id}`, options);
//     console.log(response);
//     const apiResponse = response.json();
//     console.log(apiResponse);
//     return apiResponse;
// };

// Calling Delete Movie (Don't Use)
// (async ()=> {
//    await deleteMovie(4)
// })()

