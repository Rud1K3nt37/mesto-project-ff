import './styles/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setupCloseButtons, setupOverlayClose, openEditProfileModal } from './components/modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './components/validation.js';
import { request, getUserInfo, getCards } from './components/api.js';

// Настройки для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Включение валидации
enableValidation(validationConfig);

const cardContainer = document.querySelector('.places__list');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const addPopup = document.querySelector('.popup_type_new-card');

setupCloseButtons(closeButtons);
setupOverlayClose(popups);

function openImage(imageSrc, imageCaption) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;

  openModal(popup);
}

// Открытие формы добавления карточки с очисткой ошибок
addProfileButton.addEventListener('click', () => {
  openModal(addPopup);
  clearValidation(newCardForm, validationConfig);
});

// Открытие формы редактирования профиля с подставлением данных пользователя
editProfileButton.addEventListener('click', () => {
  getUserInfo()
    .then((userData) => {
      openEditProfileModal(userData);  // Передаем данные в функцию открытия модального окна
      clearValidation(formElement, validationConfig);
    })
    .catch((err) => {
      console.error('Ошибка при загрузке данных пользователя:', err);
    });
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const updatedUserData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  // Отправляем PATCH-запрос для обновления данных пользователя
  request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(updatedUserData),
  })
  .then((updatedUserInfo) => {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = updatedUserInfo.name;
    profileDescription.textContent = updatedUserInfo.about;

    closeModal(document.querySelector('.popup_type_edit'));
  })
  .catch((err) => {
    console.error('Ошибка при обновлении данных пользователя:', err);
  });
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    description: cardNameInput.value,
  };

  const newCard = createCard(cardData, deleteCard, toggleLike, openImage);
  cardContainer.prepend(newCard);

  closeModal(addPopup);

  newCardForm.reset();
  toggleButtonState(
    Array.from(newCardForm.querySelectorAll('.popup__input')),
    newCardForm.querySelector('.popup__button'),
    validationConfig
  );
});

// api.js

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек
    cardsContainer.textContent = '';  // Очищаем контейнер

    cardsData.forEach((card) => {
      const cardElement = createCard(card, deleteCard, toggleLike, openImage);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных:', err);
  });

// // Файл index.js

// import './styles/index.css';
// import { createCard, deleteCard, toggleLike } from './components/card.js';
// // import { initialCards } from './components/cards.js'; тут удалил объект карточек
// import { openModal, closeModal, setupCloseButtons, setupOverlayClose, openEditProfileModal } from './components/modal.js';
// import { enableValidation, clearValidation, toggleButtonState } from './components/validation.js';
// import { request, getUserInfo, getCards } from './components/api.js';

// // Настройки для валидации
// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// };

// // Включение валидации
// enableValidation(validationConfig);

// const cardContainer = document.querySelector('.places__list');
// const newCardForm = document.querySelector('.popup__form[name="new-place"]');
// const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
// const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');
// const editProfileButton = document.querySelector('.profile__edit-button');
// const addProfileButton = document.querySelector('.profile__add-button');
// const nameInput = document.querySelector('.popup__input_type_name');
// const jobInput = document.querySelector('.popup__input_type_description');
// const formElement = document.querySelector('.popup__form[name="edit-profile"]');
// const closeButtons = document.querySelectorAll('.popup__close');
// const popups = document.querySelectorAll('.popup');
// const addPopup = document.querySelector('.popup_type_new-card');

// setupCloseButtons(closeButtons);
// setupOverlayClose(popups);

// function openImage(imageSrc, imageCaption) {
//   const popup = document.querySelector('.popup_type_image');
//   const popupImage = popup.querySelector('.popup__image');
//   const popupCaption = popup.querySelector('.popup__caption');

//   popupImage.src = imageSrc;
//   popupImage.alt = imageCaption;
//   popupCaption.textContent = imageCaption;

//   openModal(popup);
// }

// // Открытие формы добавления карточки с очисткой ошибок
// addProfileButton.addEventListener('click', () => {
//   openModal(addPopup);
//   clearValidation(newCardForm, validationConfig);
// });

// // Открытие формы редактирования профиля с очисткой ошибок
// // editProfileButton.addEventListener('click', () => {
// //   const profileTitle = document.querySelector('.profile__title');
// //   const profileDescription = document.querySelector('.profile__description');

// //   nameInput.value = profileTitle.textContent;
// //   jobInput.value = profileDescription.textContent;

// //   clearValidation(formElement, validationConfig);

// //   openModal(document.querySelector('.popup_type_edit'));
// // });

// // Открытие формы редактирования профиля с подставлением данных пользователя
// editProfileButton.addEventListener('click', () => {
//   getUserInfo()
//     .then((userData) => {
//       openEditProfileModal(userData);  // Передаем данные в функцию открытия модального окна
//       clearValidation(formElement, validationConfig);
//     })
//     .catch((err) => {
//       console.error('Ошибка при загрузке данных пользователя:', err);
//     });
// });


// formElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
  
//   const profileTitle = document.querySelector('.profile__title');
//   const profileDescription = document.querySelector('.profile__description');
  
//   // profileTitle.textContent = nameInput.value;
//   // profileDescription.textContent = jobInput.value;

//   const updatedUserData = {
//     name: nameInput.value,
//     about: jobInput.value,
//   };

//   // Отправляем PATCH-запрос для обновления данных пользователя
//   request('/users/me', {
//     method: 'PATCH',
//     body: JSON.stringify(updatedUserData),
//   })
//   .then((updatedUserInfo) => {
//     profileTitle.textContent = updatedUserInfo.name;
//     profileDescription.textContent = updatedUserInfo.about;

//   closeModal(document.querySelector('.popup_type_edit'));
//   })
//   .catch((err) => {
//     console.error('Ошибка при обновлении данных пользователя:', err);
//   });
// });

// newCardForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const cardData = {
//     name: cardNameInput.value,
//     link: cardLinkInput.value,
//     description: cardNameInput.value,
//   };

//   const newCard = createCard(cardData, deleteCard, toggleLike, openImage);
//   cardContainer.prepend(newCard);
  
//   closeModal(addPopup);

//   newCardForm.reset();
//   toggleButtonState(
//     Array.from(newCardForm.querySelectorAll('.popup__input')),
//     newCardForm.querySelector('.popup__button'),
//     validationConfig
//   );
// });

// // initialCards.forEach(cardData => { это использовась вначале создания карточек, но теперь я делаю через API
// //   const newCard = createCard(cardData, deleteCard, toggleLike, openImage);
// //   cardContainer.append(newCard);
// // });

// // api.js

// getUserInfo();

// // Ожидаем выполнения обоих запросов
// Promise.all([getUserInfo(), getCards()])
//   .then(([userData, cardsData]) => {
//     // Загрузка карточек с сервера и их отображение
//     const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек

//     // Очищаем контейнер, чтобы не было старых данных
//     cardsContainer.textContent = '';

//     // Перебираем карточки и добавляем их в контейнер
//     cardsData.forEach((card) => {
//       const cardElement = createCard(card, deleteCard, toggleLike, openImage); // Создаем карточку
//       cardsContainer.append(cardElement); // Добавляем в контейнер
//     });
//   })
//   .catch((err) => {
//     console.error('Ошибка при загрузке данных:', err);
//   });
