import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AuthForm from './AuthForm';

function Register ({ handleRegisterSubmit }) {
  const [formValues, setFormValues]= useState({ 
    email: '',
    password: ''
  })

  function handleSubmit (evt) {
    evt.preventDefault();
    const { email, password } = formValues
    handleRegisterSubmit(email, password)
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
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Header>
      <AuthForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onChange={handleChange}
        onSubmit={handleSubmit}
        formValues={formValues}
      >
      </AuthForm>              
    </>
  )
}

export default Register;