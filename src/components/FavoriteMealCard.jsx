import PropTypes from 'prop-types';
import React, { useState } from 'react';
import logo from '../images/shareIcon.svg';
import logo2 from '../images/blackHeartIcon.svg';
import { removeRecipe } from '../services/saveFavoriteRecipes';

function FavoriteMealCard({ recipe, index }) {
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  function copyToClipboard() {
    const textToCopy = 'http://localhost:3000/meals/52771';
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('String copiada para o clipboard');
    }).catch((err) => {
      console.error('Falha ao copiar a string para o clipboard', err);
    });
    setMostrarMensagem(true);
  }
  const removeFavorite = async () => {
    await removeRecipe(recipe);
  };
  return (
    <div>
      <img
        alt="foodpicture"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <h3
        data-testid={ `${index}-horizontal-name` }
      >
        {recipe.name}

      </h3>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${recipe.nationality} - ${recipe.category}`}

      </p>
      <button
        onClick={ copyToClipboard }
        data-testid={ `${index}-horizontal-share-btn` }
        src={ logo }
      >
        compartilhar

      </button>
      {mostrarMensagem && <div>Link copied!</div>}
      <button
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ logo2 }
        onClick={ removeFavorite }
      >
        Desfavoritar Receita

      </button>
    </div>
  );
}
FavoriteMealCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteMealCard;
