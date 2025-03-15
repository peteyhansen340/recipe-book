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
            <img src="${recipe.image}" alt="${recipe.name}">
            <h2>${recipe.name}</h2>
            <div class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
                ${generateRatingStars(recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
            <div class="tags">
                ${generateTagsHTML(recipe.tags)}
            </div>
        </div>
    `;
}

// Template function to generate HTML for tags
function generateTagsHTML(tags) {
    if (!tags || tags.length === 0) return "<p>No tags available.</p>";
    
    return tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");
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

// Wait for the DOM to fully load and then run the init function
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Rendering a random recipe...");
    init();
});

