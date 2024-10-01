export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function openImage(imageSrc, imageCaption) {
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