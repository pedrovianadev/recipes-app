import React from 'react';
import drink from '../images/drinkIcon.svg';
import meal from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <button data-testid="drinks-bottom-btn">
        <img src={ drink } alt="drink" />
        {' '}
      </button>
      <button data-testid="meals-bottom-btn">
        <img src={ meal } alt="meal" />
        {' '}
      </button>
    </footer>
  );
}

export default Footer;
