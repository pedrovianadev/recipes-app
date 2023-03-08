import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validationField = () => {
    const min = 6;

    const testEmail = email.includes('@');
    const testEmail2 = email.includes('.com');
    const testEmail3 = email.length > min;
    const testPassword = password.length > min;

    return !(testEmail && testEmail2 && testEmail3 && testPassword);
  };

  const enterTheApp = () => {
    const userEmail = { email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/meals');
  };

  return (
    <div className="meals">

      <input
        type="text"
        placeholder="Email"
        data-testid="email-input"
        onChange={ (event) => setEmail(event.target.value) }
        name="email"
      />

      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
        onChange={ (event) => setPassword(event.target.value) }
        name="password"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validationField() }
        onClick={ () => enterTheApp() }
      >
        Entrar
      </button>

      <span className="logo">FAÇA SEU LOGIN!</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>

    </div>
  );
}
