document.addEventListener("DOMContentLoaded", () => {
    const gamesContainer = document.getElementById("games-container");
    const searchInput = document.getElementById("search-input");
    const filterSelect = document.getElementById("filter-select");

    fetch("http://localhost:3000/games")
    .then((response) => response.json())
    .then((data) => {
        const gamesData = data;

        function addComments(parent, comments) {
            parent.innerHTML = "";
            comments.forEach((commentText) => {
                const comment = document.createElement("p");
                comment.textContent = commentText;
                parent.appendChild(comment);
            });
        }

        function showGames(game) {
            const gamesCard = document.createElement("div");
            gamesCard.classList.add("games-card");