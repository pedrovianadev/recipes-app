import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouter/renderWithRouter';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const submitTestId = 'login-submit-btn';

describe('Teste da tela de login', () => {
  it('Testa se componentes são renderizados de forma correta', () => {
    const mockLogin = jest.fn();

    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(submitTestId);

    const correctEmail = 'test@test.com';
    const correctPass = '1234567';

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(email, correctEmail);
    userEvent.type(password, correctPass);
    expect(loginButton).toBeEnabled();

    waitFor(() => {
      userEvent.click(loginButton);
      expect(mockLogin).toBeCalledTimes(1);
    });
  });

  it('Testa se o botão de login é desabilitado quando o email ou a senha não inválidos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(submitTestId);

    const wrongEmail = 'testandoEle';
    const wrongPass = '123456';

    expect(loginButton).toBeDisabled();

    userEvent.type(email, wrongEmail);
    userEvent.type(password, wrongPass);
    expect(loginButton).toBeDisabled();
  });

  it('Testa se ao clicar no botão de login é redirecionado para a página de receitas', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const loginButton = screen.getByTestId(submitTestId);

    const correctEmail = 'test@test.com';
    const correctPass = '1234567';

    userEvent.type(email, correctEmail);
    userEvent.type(password, correctPass);
    waitFor(() => {
      userEvent.click(loginButton);
      const pageTitle = screen.getByTestId('page-title');
      expect(pageTitle).toBeInTheDocument();
      expect(pageTitle).toHaveTextContent('Meals');
    });
  });
});
