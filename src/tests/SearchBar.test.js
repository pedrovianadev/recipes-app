import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter/renderWithRouter';

describe('Test SearchBar', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

  const execSearchBtn = 'exec-search-btn';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  const searchTopBtn = 'search-top-btn';
  const nameSearchRadio = 'name-search-radio';
  const SearchInput = 'search-input';

  test('Testando pesquisa atraves de ingrediente na pagina meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');

    userEvent.type(searchInput, 'potatoes');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    await waitFor(() => {
      const result = screen.getByText(/Breakfast Potatoes/i);
      expect(result).toBeInTheDocument();
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioLetter = screen.getByTestId(firstLetterSearchRadio);

    userEvent.type(searchInput, 'e');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      const filteredByLetter = screen.getByText(/Eton Mess/i);
      expect(filteredByLetter).toBeInTheDocument();
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioName = screen.getByTestId(nameSearchRadio);

    userEvent.type(searchInput, 'abcdefg');
    userEvent.click(radioName);
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioLetter = screen.getByTestId(firstLetterSearchRadio);

    userEvent.type(searchInput, 'abc');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioLetter = screen.getByTestId(firstLetterSearchRadio);

    userEvent.type(searchInput, 'abc');
    userEvent.click(radioLetter);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1);
    });
  });

  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const toggleSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(toggleSearch);

    const searchInput = screen.getByTestId(SearchInput);
    const searchButton = screen.getByTestId(execSearchBtn);
    const radioName = screen.getByTestId(nameSearchRadio);

    userEvent.type(searchInput, 'Eton Mess');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    await waitFor(() => {
      const { location: { pathname } } = history;

      expect(pathname).toBe('/meals/52791');
    });
  });
});
