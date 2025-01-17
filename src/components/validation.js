// файл validation.js

// Функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверяет валидность поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.dataset.errorMessage && inputElement.type === "text") {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    if (!regex.test(inputElement.value)) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Проверка наличия ошибок в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Функция для активации или деактивации кнопки отправки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Устанавливает обработчики событий для каждого input
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, validationConfig);
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
      }

      checkInputValidity(formElement, inputElement, validationConfig);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });

  toggleButtonState(inputList, buttonElement, validationConfig); // Изначально деактивируем кнопку
};

// Функция для включения валидации на всех формах
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault(); // Останавливаем отправку формы
    });

    setEventListeners(formElement, validationConfig); // Устанавливаем слушатели для полей
  });
};

// Функция очистки валидации
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig); // Скрыть все ошибки
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

// Экспортируем функции, чтобы использовать их в других файлах
export { enableValidation, clearValidation, toggleButtonState };


// // Показывает ошибку
// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__error_visible');
// };

// // Скрывает ошибку
// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__input_type_error');
//   errorElement.classList.remove('popup__error_visible');
//   errorElement.textContent = '';
// };

// Проверяет валидность поля
// const checkInputValidity = (formElement, inputElement) => {
//   if (inputElement.dataset.errorMessage && inputElement.type === "text") {
//     const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
//     if (!regex.test(inputElement.value)) {
//       inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//     } else {
//       inputElement.setCustomValidity("");
//     }
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// // Активирует/деактивирует кнопку отправки
// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add('popup__button_disabled');
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__button_disabled');
//   }
// };

// // Проверяет, есть ли невалидные поля
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// // Устанавливает обработчики событий на поля формы
// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);

//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// // Включает валидацию для всех форм
// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));

//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement);
//   });
// };

// // Очищает ошибки и сбрасывает состояние кнопки
// const clearValidation = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__button');

//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement);
//   });

//   toggleButtonState(inputList, buttonElement);
// };

// export { enableValidation, clearValidation, toggleButtonState };