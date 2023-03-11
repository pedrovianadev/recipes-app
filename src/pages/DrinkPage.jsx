import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DetailsDrinks } from '../components/DetailsDrinks';

function DrinkPage() {
  const history = useHistory();
  const { id } = useParams();
  let inProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
  const handleStartRecipe = () => {
    inProgressRecipes = { ...inProgressRecipes, drinks: { [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push(`/drinks/${id}/in-progress`);
  };

  useEffect(() => {
    if (!localStorage.inProgressRecipes) {
      localStorage.setItem(
        'inProgressRecipes',
        JSON.stringify({ drinks: {}, meals: {} }),
      );
    }
  }, []);

  return (
    <div>
      <h1>DrinkPage</h1>
      <DetailsDrinks />
      <button
        data-testid="start-recipe-btn"
        className="Start-Recipe"
        onClick={ () => handleStartRecipe() }
      >
        {Object.keys(inProgressRecipes.drinks)
          ?.includes(id) ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default DrinkPage;
