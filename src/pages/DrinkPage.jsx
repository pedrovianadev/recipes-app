import { useHistory, useParams } from 'react-router-dom';
import { DetailsDrinks } from '../components/DetailsDrinks';

function DrinkPage() {
  const history = useHistory();
  const { id } = useParams();
  const handleStartRecipe = () => {
    history.push(`/drinks/${id}/in-progress`);
  };
  return (
    <div>
      <h1>DrinkPage</h1>
      <DetailsDrinks />
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

export default DrinkPage;
