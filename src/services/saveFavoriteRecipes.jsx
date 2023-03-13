const FAVORITE_RECIPES_KEY = 'favoriteRecipes';
const DONE_RECIPES_KEY = 'doneRecipes';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY))) {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(DONE_RECIPES_KEY))) {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify([]));
}
const readFavoriteRecipes = () => JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY));

const readDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_RECIPES_KEY));

const saveFavoriteRecipes = (favoriteRecipes) => localStorage
  .setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));

const saveDoneRecipes = (favoriteRecipes) => localStorage
  .setItem(DONE_RECIPES_KEY, JSON.stringify(favoriteRecipes));

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteRecipes = () => {
  const favoriteRecipes = readFavoriteRecipes();
  return (favoriteRecipes);
};

export const getDoneRecipes = () => {
  const doneRecipes = readDoneRecipes();
  return (doneRecipes);
};

export const addRecipe = (recipe) => new Promise((resolve) => {
  if (recipe) {
    const favoriteRecipes = readFavoriteRecipes();
    saveFavoriteRecipes([...favoriteRecipes, recipe]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const addDoneRecipe = (recipe) => new Promise((resolve) => {
  if (recipe) {
    const doneRecipes = readDoneRecipes();
    saveDoneRecipes([...doneRecipes, recipe]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeRecipe = (recipe) => new Promise((resolve) => {
  const favoriteRecipes = readFavoriteRecipes();
  saveFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id));
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeDoneRecipe = (recipe) => new Promise((resolve) => {
  const doneRecipes = readDoneFavoriteRecipes();
  saveDoneRecipes(doneRecipes.filter((r) => r.id !== recipe.id));
  simulateRequest(SUCCESS_STATUS)(resolve);
});
