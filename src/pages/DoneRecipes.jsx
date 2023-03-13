import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [notes, setNotes] = useState('');
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipesStorage = JSON.parse(localStorage
      .getItem('doneRecipes')) || []; setDoneRecipes(recipesStorage);
  }, []);

  useEffect(() => {
    setRecipes(doneRecipes);
  }, [doneRecipes]);

  const setAll = () => {
    setRecipes(doneRecipes);
  };

  const filters = {
    all: () => setRecipes(doneRecipes),
    meal: () => setRecipes(doneRecipes.filter((done) => done.type === 'meal')),
    drink: () => setRecipes(doneRecipes.filter((done) => done.type === 'drink')),
  };

  const filterFunc = ({ target }) => {
    const option = target.name; filters[option]();
  };

  const copy = async ({ type, id }) => {
    await clipboardCopy(`http://localhost:3000/${type}s/${id}`); setNotes('Link copied!');
  };

  return (
    <div>

      <Header title="Done Recipes" />

      <section>
        {notes}
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ setAll }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          name="meal"
          type="button"
          onClick={ (event) => filterFunc(event) }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          name="drink"
          type="button"
          onClick={ (event) => filterFunc(event) }
        >
          Drinks
        </button>
      </section>

      <main>
        {recipes.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              {recipe.type === 'meal' ? (
                <>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                  <p data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
                    { recipe.tags[0] }
                  </p>
                  <p data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
                    { recipe.tags[1] }
                  </p>
                </>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>
              )}
              <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </Link>

            <button type="button" onClick={ () => copy(recipe) }>
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

          </div>
        ))}
      </main>
    </div>
  );
}

export default DoneRecipes;
