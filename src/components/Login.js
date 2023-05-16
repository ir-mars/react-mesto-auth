import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AuthForm from './AuthForm';

function Login ({ handleLoginSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  function handleSubmit (evt) {
    evt.preventDefault();
    const { email, password } = formValues
    handleLoginSubmit(email, password)
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  
  return (
    <>
      <Header>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header>
      <AuthForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onChange={handleChange}
        onSubmit={handleSubmit}
        formValues={formValues}
      >
      </AuthForm> 
    </>
  )
}

export default Login;