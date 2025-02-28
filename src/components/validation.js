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
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
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

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
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

export { enableValidation, clearValidation };