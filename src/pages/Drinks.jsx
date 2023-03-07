import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkCard from '../components/DrinkCard';
import RecipesContext from '../context/recipesContext';

function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const slice = 12;
  return (
    <div>
      <Header
        title="Drinks"
        haveSearch
      />
      {drinks.drinks?.length > 0
        ? drinks.drinks.slice(0, slice).map((drink, index) => (
          <DrinkCard drink={ drink } index={ index } key={ index } />)) : null}

      <Footer />
    </div>
  );
}

export default Drinks;
