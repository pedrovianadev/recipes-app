import { useState } from 'react';

export function Login() {
  const [validations, setValidations] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });

  const validationField = () => {
    const { email, password } = validations;
    const min = 6;

    const testEmail = email.includes('@');
    const testEmail2 = email.includes('.com');
    const testEmail3 = email.length > min;
    const testPassword = password.length > min;

    if (testEmail && testEmail2 && testEmail3 && testPassword) {
      setValidations({
        ...validations,
        isDisabled: false,
      });
    } else {
      setValidations({
        ...validations,
        isDisabled: true,
      });
    }
  };

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const x = () => console.log(validations);
    setValidations({
      ...validations,
      [name]: value,
    }, x());

    // validationField();
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Email"
        data-testid="email-input"
        onChange={ (event) => onChangeInput(event) }
        name="email"
      />

      <input
        type="password"
        placeholder="Senha"
        data-testid="password-input"
        onChange={ (event) => onChangeInput(event) }
        name="password"
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ validations.isDisabled }
      >
        Entrar
      </button>

    </div>
  );
}
