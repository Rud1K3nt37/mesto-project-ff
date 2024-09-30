import { openModalImage } from './modal.js';

export function createCard(cardData, deleteCardCallback, likeCardCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const trashButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardTitle.textContent = cardData.name;
  
  trashButton.addEventListener('click', () => {
    deleteCardCallback(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCardCallback(likeButton);
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function openImagePopup(imageSrc, imageCaption) {
  openModalImage(imageSrc, imageCaption);
}