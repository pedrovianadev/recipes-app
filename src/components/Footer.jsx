import React from 'react';
import { useHistory } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drink } alt="drink" />
        {' '}
      </button>
      <button
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      >
        <img src={ meal } alt="meal" />
        {' '}
      </button>
    </footer>
  );
}

export default Footer;
