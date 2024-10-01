import './styles/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, openImage, closeModal, setupCloseButtons, setupOverlayClose } from './components/modal.js';

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

addProfileButton.addEventListener('click', () => openModal(addPopup));

editProfileButton.addEventListener('click', () => {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openModal(document.querySelector('.popup_type_edit'));
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  closeModal(document.querySelector('.popup_type_edit'));
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
});

initialCards.forEach(cardData => {
  const newCard = createCard(cardData, deleteCard, toggleLike, openImage);
  cardContainer.append(newCard);
});