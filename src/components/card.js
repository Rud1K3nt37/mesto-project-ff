// файл card.js
import { removeCard, likeCard } from "./api";

export function createCard(cardData, deleteCardCallback, toggleLikeCallback, openImageCallback, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  const isCardLiked = cardData.likes.find(el => el['_id'] === userId);
  
  if (userId !== cardData.owner._id) {
    cardDeleteButton.style.display = 'none';
  } else {
    cardDeleteButton.addEventListener('click', () => deleteCardCallback(cardElement, cardData._id));
  }

  if (isCardLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', () => toggleLikeCallback(cardLikeButton, cardData._id, cardLikeCount));

  cardImage.addEventListener('click', () => openImageCallback(cardData.link, cardData.name));

  return cardElement;
}

export function deleteCard(cardElement, id) {
  removeCard(id).then(data => {
    cardElement.remove();
  })
}

export function toggleLike(button, id, countElement) {
  const isLiked = button.classList.contains('card__like-button_is-active');

  likeCard(id, isLiked).then(cardData => {
    button.classList.toggle('card__like-button_is-active');
    countElement.textContent = cardData.likes.length;
  })
}