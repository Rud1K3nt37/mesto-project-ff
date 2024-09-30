import './styles/index.css';
import { createCard, deleteCard, toggleLike } from './components/card.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal, setupCloseButtons, setupOverlayClose, openModalImage } from './components/modal.js';

const cardContainer = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button');
const addProfileButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

editProfileButton.addEventListener('click', () => openModal(editPopup));
addProfileButton.addEventListener('click', () => openModal(addPopup));

setupCloseButtons(closeButtons);
setupOverlayClose(popups);

const openCardImage = document.querySelector('.places__list');

openCardImage.addEventListener('click', (event) => {
  const cardImage = event.target.closest('.card__image');
  if (cardImage) {
    const imageSrc = cardImage.src;
    const imageCaption = cardImage.alt;
    openModalImage(imageSrc, imageCaption);
  }
});

initialCards.forEach(cardData => {
  const newCard = createCard(cardData, deleteCard, toggleLike);
  cardContainer.append(newCard);
});
