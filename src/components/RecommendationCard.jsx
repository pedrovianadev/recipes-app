import PropTypes, { object } from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function RecommendationCard({ stateDrinksOrMeals }) {
  const recommendedDrinksOrMeals = stateDrinksOrMeals
    .filter((drinkOrMeal, index) => {
      const limit = 6;
      return index < limit;
    });

  console.log(recommendedDrinksOrMeals);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>

      <h3>Recommendation Cards</h3>

      <Carousel responsive={ responsive }>
        {
          recommendedDrinksOrMeals
            .map((drinkOrMeal, index) => (
              <section
                key={ drinkOrMeal.strDrink ? drinkOrMeal.strDrink : drinkOrMeal.strMeal }
                data-testid={ `${index}-recommendation-card` }
              >
                <div
                  key={
                    drinkOrMeal.strDrink ? drinkOrMeal.strDrink : drinkOrMeal.strMeal
                  }
                  className="slide"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {drinkOrMeal.strDrink ? drinkOrMeal.strDrink : drinkOrMeal.strMeal}
                </div>
              </section>
            ))
        }
      </Carousel>
    </div>
  );
}

RecommendationCard.propTypes = {
  stateDrinksOrMeals: PropTypes.arrayOf(object.isRequired).isRequired,
};
