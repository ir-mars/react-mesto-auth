import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';

import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';

import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import imgSuccess from '../images/success.svg';
import imgFail from '../images/fail.svg'; 

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [statusToolTip, setStatusToolTip] = useState(false);
  const [textToolTip, setTextToolTip] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [authUserEmail, setAuthUserEmail] = useState('');
  const navigate = useNavigate();

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  };  

  function handleCardClick (card) {
    setSelectedCard(card);
    //console.log(card)
  };

  function handleDeleteClick (card) {
    setIsDeleteCardPopupOpen(true)
    setCardToDelete(card);
  };

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsToolTipOpen(false);
  };

  function handleCardLike (card, value) {
    api.setLike(card._id, value)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser ({ name, about }) {
    api.sendUserInfo({name, about})
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar ({ avatar }) {
    api.setAvatar({avatar})
      .then(({avatar}) => {
        setCurrentUser({...currentUser, avatar});
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit ({ name, link }) {
    api.addCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect (() => {
    loggedIn &&
    api.getUserInfo()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id })
      })
      .catch((err) => {
        console.log(err)
      })
      
  }, [loggedIn]);

  useEffect (() => {
    loggedIn &&
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData) /*console.log(cardsData)*/
      })
      .catch((err) => {
        console.log(err)
      })
      
  }, [loggedIn]);

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(()=> {
        setStatusToolTip(true);
        setIsToolTipOpen(true);
        setTextToolTip('Вы успешно зарегистрировались!')
        navigate("/sign-in", {replace: true})      
      })
      .catch((err) => {
        setStatusToolTip(false)
        setTextToolTip('Что-то пошло не так! Попробуйте еще раз.')
        console.log(err);
      })
      .finally(() => {
        setIsToolTipOpen(true)
      })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setLoggedIn(true);
          setAuthUserEmail(email);
          navigate("/", {replace: true});          
        }
      })
      .catch((err) => {
        console.log(err);
        setIsToolTipOpen(true);
        setStatusToolTip(false);
        setTextToolTip('Что-то пошло не так! Попробуйте еще раз.')
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setAuthUserEmail(data.email);
          setLoggedIn(true);
          navigate("/", {replace: true})
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [navigate]);

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate("/", {replace: true});
  } 
    
  return (
    <div>  
      <CurrentUserContext.Provider value={currentUser}>              
        <Routes>
          <Route path="/" 
            element={<ProtectedRoute
              element={Main}
              cards={cards}       
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              loggedIn={loggedIn}
              email={authUserEmail}
              exit={signOut}
              />}          
          />
          <Route path="/sign-in"
            element={<Login handleLoginSubmit={handleLogin} />} />
          <Route path="/sign-up"
            element={<Register handleRegisterSubmit={handleRegister} />} />
        </Routes>    
        <Footer />
    
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} 
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} 
        />    
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}          
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={cardToDelete}
          onCardDelete={handleCardDelete}
        />
        
        <InfoToolTip>
          isOpen={isToolTipOpen}
          onClose={closeAllPopups}
          text={textToolTip}
          status={statusToolTip}
          image={statusToolTip ? imgSuccess : imgFail}
        </InfoToolTip>

      </CurrentUserContext.Provider>
    </div>  
  );
}

export default App;
