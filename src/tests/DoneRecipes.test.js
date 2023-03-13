import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const SPICY_ARRABIATA = 'Spicy Arrabiata Penne';
const DONE_RECIPES = '/done-recipes';

const testRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testes da tela de Done Recipes', () => {
  it('Checa se todos os botões foram renderizados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
  });

  it('Checa se é renderizada todas as receitas feitas quando clicado no All', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(testRecipes));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const allButton = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(allButton);

    const recipe1 = screen.getByText(SPICY_ARRABIATA);
    const recipe2 = screen.getByText('Aquamarine');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('Checa se é renderizada todas as receitas feitas quando clicado no Meals', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(testRecipes));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const mealButton = screen.getByTestId('filter-by-meal-btn');
    fireEvent.click(mealButton);

    const recipe1 = screen.getByText(SPICY_ARRABIATA);
    const recipe2 = screen.queryByText('Aquamarine');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
  });

  it('Checa se é renderizada todas as receitas feitas quando clicado no Drinks', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(testRecipes));

    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(drinkButton);

    const recipe1 = screen.queryByText(SPICY_ARRABIATA);
    const recipe2 = screen.getByText('Aquamarine');

    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('Checa se o link é copiado ao clicar no botão', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(testRecipes));
    navigator.clipboard = { writeText: jest.fn() };

    const { history } = renderWithRouter(<App />);
    act(() => history.push(DONE_RECIPES));

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    fireEvent.click(shareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
});
