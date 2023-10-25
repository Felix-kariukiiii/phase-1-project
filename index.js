document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.getElementById("games-container");
    const searchInput = document.getElementById("search-input");
    const filterSelect = document.getElementById("filter-select");

    fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => {
        const gamesData = data;