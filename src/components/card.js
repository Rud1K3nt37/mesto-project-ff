export function createCard(cardData, deleteCardCallback, toggleLikeCallback, openImageCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  cardTitle.textContent = cardData.name;
  
  cardDeleteButton.addEventListener('click', () => deleteCardCallback(cardElement));
  cardLikeButton.addEventListener('click', () => toggleLikeCallback(cardLikeButton));
  cardImage.addEventListener('click', () => openImageCallback(cardData.link, cardData.name));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}