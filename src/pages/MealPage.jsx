import { DetailsMeals } from '../components/DetailsMeals';

function MealPage() {
  return (
    <div>
      <h1>MealPage</h1>
      <DetailsMeals />
      <button
        data-testid="start-recipe-btn"
        className="Start-Recipe"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default MealPage;
