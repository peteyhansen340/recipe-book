import { recipes } from "./recipes.mjs";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Loading recipes...");
    loadRecipes();
});

function loadRecipes() {
    const recipesContainer = document.querySelector(".recipes");
    if (!recipesContainer) {
        console.error("Error: .recipes container not found!");
        return;
    }

    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div class="rating" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${renderStars(recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
        `;

        recipesContainer.appendChild(recipeCard);
    });

    console.log("Recipes loaded successfully.");
}

function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="${i <= rating ? "icon-star" : "icon-star-empty"}">⭐</span>`;
    }
    return stars;
}

function searchRecipes() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchInput)
    );

    const recipesContainer = document.querySelector(".recipes");
    recipesContainer.innerHTML = "";

    if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found.</p>";
    } else {
        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h2>${recipe.name}</h2>
                <div class="rating">${renderStars(recipe.rating)}</div>
                <p class="description">${recipe.description}</p>
            `;

            recipesContainer.appendChild(recipeCard);
        });
    }
}
