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

                const commentInput = document.createElement("input"); 
                commentInput.type = "text";
                commentInput.placeholder = "Enter your comment";

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

                const salePrice = document.createElement("p");
                salePrice.textContent = `Sale Price: ${game.salePrice}`;

                const normalPrice = document.createElement("p");
                normalPrice.textContent = `Normal Price: ${game.normalPrice}`;

                const rating = document.createElement("p");
                rating.textContent = `Rating: ${game.dealRating} out of 10`;

                const comments = document.createElement("div");
                comments.classList.add("comments");

                gamesCard.appendChild(gamesName);
                gamesCard.appendChild(salePrice);
                gamesCard.appendChild(normalPrice);
                gamesCard.appendChild(rating);
                gamesCard.appendChild(gamesImage);
                gamesCard.appendChild(likeButton);
                gamesCard.appendChild(orderButton);
                gamesCard.appendChild(commentInput); 
                gamesCard.appendChild(commentButton);
                gamesCard.appendChild(comments);

                gamesContainer.appendChild(gamesCard);
            }

            function filterGames() {
                const filterValue = filterSelect.value;
                const searchValue = searchInput.value.toLowerCase();

                gamesContainer.innerHTML = "";

                gamesData.forEach((game) => {
                    if (
                        (filterValue === "all" ||
                            (filterValue === "liked" && game.liked) ||
                            (filterValue === "ordered" && game.ordered)) &&
                        (game.title.toLowerCase().includes(searchValue) || searchValue === "")
                    ) {
                        showGames(game);
                    }
                });
            }

            filterGames();

            searchInput.addEventListener("input", filterGames);
            filterSelect.addEventListener("change", filterGames);
        })
        .catch((error) => console.error("Error fetching data:", error));
});
