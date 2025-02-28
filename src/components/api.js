// файл api.js

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: '466a373c-fbe5-48b6-8a2f-57e002faf54e',
    'Content-Type': 'application/json',
  },
};

const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
  .then(res => res.json());
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
  .then(res => res.json());
}

const updateUserAvatar = (link) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(res => res.json());
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
  .then(res => res.json());
}

const removeCard = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(res => res.json());
}

const likeCard = (id, isLiked) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: isLiked? 'DELETE': 'PUT',
    headers: apiConfig.headers
  })
  .then(res => res.json());
}


export { getUserInfo, updateUserInfo, updateUserAvatar, getInitialCards, addNewCard, removeCard, likeCard };