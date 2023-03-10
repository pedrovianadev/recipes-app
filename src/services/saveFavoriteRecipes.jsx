const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY))) {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
}
const readFavoriteRecipes = () => JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY));

const saveFavoriteRecipes = (favoriteRecipes) => localStorage
  .setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteRecipes = () => new Promise((resolve) => {
  const favoriteRecipes = readFavoriteRecipes();
  simulateRequest(favoriteRecipes)(resolve);
});

export const addRecipe = (recipe) => new Promise((resolve) => {
  if (recipe) {
    const favoriteRecipes = readFavoriteRecipes();
    saveFavoriteRecipes([...favoriteRecipes, recipe]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (recipe) => new Promise((resolve) => {
  const favoriteRecipes = readFavoriteRecipes();
  saveFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
