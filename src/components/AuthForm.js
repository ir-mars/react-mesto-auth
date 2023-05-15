import { Link } from 'react-router-dom';

function AuthForm ({ name, title, buttonText }) {
    return (
      <div className={`auth auth_type_${name}`}>
        <div className="auth__container">
          <h2 className="auth__title">{title}</h2>
          <form 
            className="auth__form"
            name={`${name}`}
            action="#"
          
          >
            <input
              className="auth__input auth__input_email"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              minLength={2}
              maxLength={40}
              required 
            />
            <span
              className="auth__input-error"
              id="email-error" 
            />
            <input
              className="auth__input auth__input_password"
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              minLength={2}
              maxLength={200}
              required 
            />
            <span
              className="auth__input-error"
              id="password-error" 
            />
            <button className="auth__submit-btn" type="submit">{buttonText}</button>
          </form>
          {name === "register" && (
            <p className="auth__text">
              Уже зарегистрированы?
              <Link to="sign-in" className="auth__link">Войти</Link>
            </p>
          )}
        </div>
      </div>
    )
}
    
export default AuthForm;    