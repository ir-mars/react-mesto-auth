import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AuthForm from './AuthForm';

function Register () {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Header>
      <AuthForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
      >
      </AuthForm>
              
    </>
  )
}

export default Register;