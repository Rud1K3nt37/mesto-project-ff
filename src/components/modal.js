const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

export function openModal(popup) {
  if (popup === document.querySelector('.popup_type_edit')) {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    if (profileTitle && profileDescription) {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileDescription.textContent;
    }
  }

  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function openModalImage(imageSrc, imageCaption) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;

  openModal(popup);
}

export function closeModal(popup) {

  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEscClose);

  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
}

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function setupCloseButtons(closeButtons) {
  closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const popup = event.target.closest('.popup');
      closeModal(popup);
    });
  });
}

export function setupOverlayClose(popups) {
  popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });
  });
}

export function handleFormSubmit(evt, editPopup) {
  evt.preventDefault();

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeModal(editPopup);
}

formElement.addEventListener('submit', (evt) => handleFormSubmit(evt, document.querySelector('.popup_type_edit')));

const closeImagePopupButton = document.querySelector('.popup_type_image .popup__close');
closeImagePopupButton.addEventListener('click', () => {
  closeModal(document.querySelector('.popup_type_image'));
});
