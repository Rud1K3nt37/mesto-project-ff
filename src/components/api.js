// файл api.js

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '466a373c-fbe5-48b6-8a2f-57e002faf54e',
    'Content-Type': 'application/json',
  },
};

// Функция для обработки ответа
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // Если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
  // .then(res => res.json());
  .then(handleResponse);
}

const updateUserInfo = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  // .then(res => res.json());
  .then(handleResponse);
}

const updateUserAvatar = (link) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  // .then(res => res.json());
  .then(handleResponse);
}

const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
  .then(res => res.json());
}

const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  // .then(res => res.json());
  .then(handleResponse);
}

const removeCard = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  // .then(res => res.json());
  .then(handleResponse);
}

const likeCard = (id, isLiked) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: isLiked? 'DELETE': 'PUT',
    headers: apiConfig.headers
  })
  // .then(res => res.json());
  .then(handleResponse);
}


export { getUserInfo, updateUserInfo, updateUserAvatar, getInitialCards, addNewCard, removeCard, likeCard };