"use strict";
// URL
const DOMAIN = 'http://localhost:3000';
console.log(DOMAIN);

// Add movie
const showPopupButton = document.getElementById('showPopupButton');
const popupContainer = document.getElementById('popupContainer');
const submitButton = document.getElementById('submitButton');
// Function to show the modal
function showPopup() {
    popupContainer.style.display = 'block';
    $('#movieForm> input').keyup(function() {

        let empty = false;
        $('#movieForm > input').each(function() {
            if ($(this).val() === '') {
                empty = true;
            }
        });

        if (empty) {
            $('#submitButton').attr('disabled', 'disabled');
            $('#addWarning').css('display', 'block')
        } else {
            $('#submitButton').removeAttr('disabled');
            $('#addWarning').css('display', 'none');
        }
    });
}
// Function to hide the modal
function hidePopup() {
    popupContainer.style.display = 'none';
}
// Attach click event to the button
showPopupButton.addEventListener('click', showPopup);
submitButton.addEventListener('click', hidePopup);


// Create, Edit and Delete a Movie
$(document).ready(function() {
    //Create Movie Function-- Sorts titles in alphabetical order--
    function renderMovieList() {
        $.ajax({
            url: `${DOMAIN}/movies`,
            type: "GET",
            success: function(response) {
                // Sort the movies by title before rendering
                response.sort(function(a, b) {
                    // Use localeCompare for case-insensitive sorting
                    return a.title.localeCompare(b.title);
                });

                // Clear the table body before rendering the updated list
                $("#characters tbody").empty();

                response.forEach(function(movie) {
                    const movieRow = $("<tr>").append(
                        $("<td class='character-name'>").text(movie.title),
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
                        $("<td>").append(
                            $("<button>")
                                .text("Edit")
                                .click(function() {
                                    showEditDialog(movie);
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



    // Delete Function
    function deleteMovie(movieId) {
        $.ajax({
            url: `${DOMAIN}/movies/${movieId}`,
            type: "DELETE",
            success: function(response) {
                console.log("Movie deleted successfully!");

                renderMovieList();
            },
            error: function(error) {
                console.error("Error deleting movie:", error);
            }
        });
    }



    // Edit Function
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



    // New function to show the edit dialog
    function showEditDialog(movie) {
        $("#editMovieId").val(movie.id);
        $("#editTitle").val(movie.title);
        $("#editGenre").val(movie.genre);
        $("#editRating").val(movie.rating);

        $("#editDialog").show();
    }

    // Attach click event to the Edit button in the table rows
    $(document).on("click", ".btnEdit", function() {
         const movie = {
            id: $(this).closest("tr").find(".movie-id").text(),
            title: $(this).closest("tr").find(".character-name").text(),
            genre: $(this).closest("tr").find(".movie-genre").text(),
            rating: $(this).closest("tr").find(".movie-rating").text(),
        };
        showEditDialog(movie);
    });

    $("#btnUpdateMovie").click(function() {
        const updatedMovie = {
            id: $("#editMovieId").val(),
            title: $("#editTitle").val(),
            genre: $("#editGenre").val(),
            rating: $("#editRating").val(),
        };

        editMovie(updatedMovie)
            .then(() => {
                console.log("Movie updated successfully!");
                renderMovieList(); // Refresh the movie list after updating
                $("#editDialog").hide(); // Hide the edit dialog
            })
            .catch((error) => {
                console.error("Error updating movie:", error);
            });
    });
    // edit form for required fields.
    $('#editForm > input').keyup(function() {

        let empty = false;
        $('#editForm > input').each(function() {
            if ($(this).val() === '') {
                empty = true;
            }
        });

        if (empty) {
            $('#btnUpdateMovie').attr('disabled', 'disabled');
            $('#editWarning').css('display', 'block')
        } else {
            $('#btnUpdateMovie').removeAttr('disabled');
            $('#editWarning').css('display', 'none');
        }
    });
});


