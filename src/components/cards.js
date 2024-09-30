import { createCard, deleteCard, toggleLike } from './card.js';
import { closeModal } from './modal.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      description: "Живописный вид на горы",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      description: "Живописная река на Среднем Урале",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      description: "Фотография где много многоэтажек с видом сверху",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      description: "Пейзаж Камчатского полуострова и вдали авачинского вулкана",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      description: "Железная дорога среди природы",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      description: "Скалистые горы на берегу озера Байкал зимой",
    }
];

export function handleCardFormSubmit(evt, addPopup) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
    description: cardNameInput.value,
  };

  const newCard = createCard(cardData, deleteCard, toggleLike);
  const cardContainer = document.querySelector('.places__list');

  cardContainer.prepend(newCard);

  closeModal(addPopup);
  newCardForm.reset();
}

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

newCardForm.addEventListener('submit', (evt) => handleCardFormSubmit(evt, document.querySelector('.popup_type_new-card')));

