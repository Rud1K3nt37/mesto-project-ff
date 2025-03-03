import './styles/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { openModal, closeModal, setupCloseButtons, setupOverlayClose } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, updateUserInfo, updateUserAvatar, getInitialCards, addNewCard} from './components/api.js';

// Настройки для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

let myId = '';

// Включение валидации
enableValidation(validationConfig);

const cardContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const addProfileButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const popups = document.querySelectorAll('.popup');
const addPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editAvatarButton = document.querySelector('.profile__image__edit-button');
const newAvatar = document.querySelector('.popup_type_new-avatar');
const newAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const newAvatarFormInput = newAvatarForm.elements.link;

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

editProfileButton.addEventListener('click', () => {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openModal(document.querySelector('.popup_type_edit'));
  clearValidation(formElement, validationConfig); // Добавляем очистку ошибок
});

editAvatarButton.addEventListener('click', () => {
  openModal(newAvatar);
  clearValidation(newAvatarForm, validationConfig);
})

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const button = formElement.querySelector('.popup__button');
  button.textContent = 'Сохранение...';

  const updatedUserInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateUserInfo(updatedUserInfo.name, updatedUserInfo.about)
  .then(updatedUserData => {
    profileTitle.textContent = updatedUserData.name;
    profileDescription.textContent = updatedUserData.about;
    closeModal(document.querySelector('.popup_type_edit'));
  })
  .catch(err => console.log(err))
  .finally(() => {
    button.textContent = 'Сохранить';
  })
})

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const button = newCardForm.querySelector('.popup__button');
  button.textContent = 'Сохранение...';

  addNewCard(cardNameInput.value, cardLinkInput.value)
  .then(newCardData => {
      const newCard = createCard(newCardData, deleteCard, toggleLike, openImage, myId);
      cardContainer.prepend(newCard);
    
      closeModal(addPopup);
    
      newCardForm.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    })
  })

  newAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const button = newAvatarForm.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    updateUserAvatar(newAvatarFormInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(document.querySelector('.popup_type_new-avatar'));
      newAvatarForm.reset();
      
    })
    .catch(err => console.log(err))
    .finally(() => {
    button.textContent = 'Сохранить';
    })
  })

Promise.all([getUserInfo(), getInitialCards()]).then(([userData, cards]) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  myId = userData._id;

  const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек

  cards.forEach(function(card) {
    const cardElement = createCard(card, deleteCard, toggleLike, openImage, myId);
    cardsContainer.append(cardElement);
  });
})