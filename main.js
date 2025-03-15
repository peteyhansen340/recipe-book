import { recipes } from "./recipes.mjs";

// Generate a random number >= 0 and < num
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random recipe
function getRandomRecipe() {
    const randomIndex = getRandomNumber(recipes.length);
    return recipes[randomIndex];
}

// Template function to generate HTML for a recipe
function generateRecipeHTML(recipe) {
    return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <h2 class="recipe-name">${recipe.name}</h2>
            <div class="recipe-rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${generateRatingStars(recipe.rating)}
            </div>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-tags">
                ${generateTagsHTML(recipe.tags)}
            </div>
        </div>
    `;
}

// Template function to generate HTML for tags
function generateTagsHTML(tags) {
    if (!tags || tags.length === 0) return "<p class='no-tags'>No tags available.</p>";
    
    return tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join(" ");
}

// Template function to generate rating stars
function generateRatingStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        stars += `<span aria-hidden="true" class="${i <= rating ? "icon-star" : "icon-star-empty"}">⭐</span>`;
    }
    return stars;
}

// Initialize and render a random recipe when the page loads
function init() {
    const randomRecipe = getRandomRecipe();
    const recipeContainer = document.querySelector(".recipes");
    
    if (recipeContainer) {
        recipeContainer.innerHTML = generateRecipeHTML(randomRecipe);
    } else {
        console.error("Error: .recipes container not found!");
    }
}

// Search functionality for filtering recipes
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
            recipeCard.innerHTML = generateRecipeHTML(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    }
}

// Event listener to handle search input
document.getElementById("search").addEventListener("input", searchRecipes);

// Wait for the DOM to fully load and then run the init function
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Rendering a random recipe...");
    init();
});
