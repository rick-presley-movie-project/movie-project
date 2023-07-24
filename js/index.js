"use strict";

const DOMAIN = 'http://localhost:3000';


// Get all resources
const getMovies = async () => {
    const response = await fetch(`${DOMAIN}/movies`);
    const movies = await response.json();
    return movies;
};


// Get specific resource
// const getUser = async (id) => {
//     const response = await fetch(`${DOMAIN}/movies/${id}`);
//     const movies = await response.json();
//     return user;
// };


// Create resource
// const createUser = async (user) => {
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     };
//     const response = await fetch(`${DOMAIN}/users`, options);
//     const apiResponse = response.json();
//     return apiResponse;
// };


// Edit resource
// const editUser = async (user) => {
//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     };
//     const response = await fetch(`${DOMAIN}/users/${user.id}`, options);
//     const apiResponse = response.json();
//     return apiResponse;
// };


// Delete resource
// const deleteUser = async (id) => {
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const response = await fetch(`${DOMAIN}/users/${id}`, options);
//     const apiResponse = response.json();
//     return apiResponse;
// };