import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login () {
  return (
    <>
      <Header>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header> 
    </>
  )
}

export default Login;