import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import Profile from '../pages/Profile';

describe('Testa o componente Footer', () => {
  it('Verifica se existem os botões', async () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/meals');

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });

  it('Verifica se os botões e estão funcionando.', async () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/meals');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
