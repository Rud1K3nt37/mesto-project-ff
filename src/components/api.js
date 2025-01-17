// файл api.js

import { openEditProfileModal } from './modal.js';

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '466a373c-fbe5-48b6-8a2f-57e002faf54e',
    'Content-Type': 'application/json',
  },
};

function request(endpoint, options = {}) {
  return fetch(`${apiConfig.baseUrl}${endpoint}`, {
    headers: apiConfig.headers,
    ...options,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });
}

function updateUserInfo({ name, about, avatar }) {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const profileImage = document.querySelector('.profile__image');

  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

// function getUserInfo() {
//   return request('/users/me')
//     .then((userData) => {
//       updateUserInfo(userData);
//     })
//     .catch((err) => {
//       console.error('Ошибка загрузки данных пользователя:', err);
//     });
// }

// function getUserInfo() {
//   return request('/users/me')
//     .then((userData) => {
//       console.log('Полученные данные пользователя:', userData); // Логируем данные
//       if (userData) {
//         openEditProfileModal(userData); // Открываем попап, если данные получены
//       } else {
//         console.error('Данные пользователя не были получены');
//       }
//     })
//     .catch((err) => {
//       console.error('Ошибка загрузки данных пользователя:', err);
//     });
// }

// Функция для получения данных пользователя
function getUserInfo() {
  return request('/users/me')
    .then((userData) => {
      console.log('Полученные данные пользователя:', userData);
      if (userData && userData.name && userData.about) {
        openEditProfileModal(userData); // Открываем попап с данными, если всё корректно
      } else {
        console.error('Данные пользователя не были получены');
      }
    })
    .catch((err) => {
      console.error('Ошибка загрузки данных пользователя:', err);
    });
}



function getCards() {
  return request('/cards') // Запрос на /cards, чтобы получить карточки
    .then((cardsData) => cardsData) // Данные карточек
    .catch((err) => {
      console.error('Ошибка загрузки карточек:', err);
    });
}


export { request, getUserInfo, getCards };