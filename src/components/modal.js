// файл modal.js

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
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

export function openEditProfileModal(userData) {
  console.log('Открытие попапа с данными:', userData);

  if (!userData || !userData.name || !userData.about) {
    console.error('Данные пользователя некорректны:', userData);
    return; // Если данные некорректны, прекращаем выполнение функции
  }
  
  const popup = document.querySelector('.popup_type_edit');
  const nameInput = popup.querySelector('.popup__input_type_name');
  const descriptionInput = popup.querySelector('.popup__input_type_description');

  // Подставляем текущие данные пользователя в поля формы
  nameInput.value = userData.name || '';
  descriptionInput.value = userData.about || '';

  // Открываем попап
  openModal(popup);
}