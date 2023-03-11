import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DetailsMeals } from '../components/DetailsMeals';

function MealPage() {
  const history = useHistory();
  const { id } = useParams();
  let inProgressRecipes = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
  const handleStartRecipe = () => {
    inProgressRecipes = { ...inProgressRecipes, meals: { [id]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push(`/meals/${id}/in-progress`);
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
      <h1>MealPage</h1>
      <DetailsMeals />
      <button
        data-testid="start-recipe-btn"
        className="Start-Recipe"
        onClick={ () => handleStartRecipe() }
      >
        {Object.keys(inProgressRecipes.meals)
          ?.includes(id) ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default MealPage;
