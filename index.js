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

            const gamesImage = document.createElement("img");
            gamesImage.src = game.thumb;

            const likeButton = document.createElement("button");
            likeButton.textContent = game.liked ? "Liked" : "Like";
            likeButton.classList.add("like-button");
            likeButton.addEventListener("click", () => {
                game.liked = !game.liked;
                likeButton.textContent = game.liked ? "Liked" : "Like";
                likeButton.classList.toggle("liked");
            });

            const orderButton = document.createElement("button");
            orderButton.textContent = game.ordered ? "Ordered" : "Order";
            orderButton.classList.add("ordered-button");
            orderButton.addEventListener("click", () => {
                game.ordered = !game.ordered;
                orderButton.textContent = game.ordered ? "Ordered" : "Order";
                orderButton.classList.toggle("ordered");
            });

            const commentButton = document.createElement("button");
            commentButton.textContent = "Add Comment";
            commentButton.classList.add("comment-button");
            commentButton.addEventListener("click", () => {
                const commentText = commentInput.value;
                if (commentText) {
                    game.comments.push(commentText);
                    addComments(comments, game.comments);
                    commentInput.value = "";
                    commentButton.textContent = "Commented";
                }
            });

            
            const gamesName = document.createElement("h2");
            gamesName.textContent = game.title;
