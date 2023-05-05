 const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '31d73e44-fcb9-4ff0-a8e8-65cffdcd1182',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
};

const getInfoProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then (res => getResponseData(res))
 };

 const getInitialCards =() => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then (res => getResponseData(res))
 };

 const saveInfoProfile = ( nameValue, aboutValue ) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameValue}`,
      about: `${aboutValue}`
    })
  })
  .then (res => getResponseData(res))
 }

 const saveNewCard = ( nameValue, urlValue ) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameValue}`,
      link: `${urlValue}`
    })
  })
  .then (res => getResponseData(res))
 }

const removeCardServer = (itemID) => {
  return fetch(`${config.baseUrl}/cards/${itemID}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then (res => getResponseData(res))  
}

const likeToggle = (itemID, toggleLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${itemID}`, {
    method: toggleLike,
    headers: config.headers
  })
  .then (res => getResponseData(res)) 
}

const addNewAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${link}`
    })
  })  
  .then (res => getResponseData(res))
}

export { config, getInfoProfile, getInitialCards, saveInfoProfile, 
  saveNewCard, removeCardServer, likeToggle, addNewAvatar
}
