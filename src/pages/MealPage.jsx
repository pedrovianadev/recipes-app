import { useHistory, useParams } from 'react-router-dom';
import { DetailsMeals } from '../components/DetailsMeals';

function MealPage() {
  const history = useHistory();
  const { id } = useParams();
  const handleStartRecipe = () => {
    history.push(`/meals/${id}/in-progress`);
  };
  return (
    <div>
      <h1>MealPage</h1>
      <DetailsMeals />
      <button
        data-testid="start-recipe-btn"
        className="Start-Recipe"
        onClick={ () => handleStartRecipe() }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default MealPage;
