import { popupProfile, buttonRedact, buttonPlus,
  popupAddCard,cards, obj,
  avatarRedact, popupAvatar, avatar, titleName,
  subtitleJob, popupFormSelectors, userInfoSelector } from './utils.js';
import { editProfile } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';
import api from './api.js';
import PopupWithForm from './popupWithForm.js';
import popupWithImage from './popupWithImage.js';
import UserInfo from './userInfo.js';
import '../pages/index.css';


//Попап редактирования профиля
const editFrofile = new PopupWithForm({
  popupFormSelectors: popupFormSelectors,
  popupSelector: popupProfile,
  callbackSubmitForm: ({name, about}) => {

    editFrofile.renderLoading(true)

    api.setUserInfo(name, about)
      .then((result) => {
        titleName.textContent = result.name;
        subtitleJob.textContent = result.about;
        editFrofile.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { editFrofile.renderLoading(false) })
  }
})

//Открытие попапа редактирования профиля
buttonRedact.addEventListener('click', () => {editFrofile.open(), user.getUserInfo()})

//Попап добавления новой карточки
const addCard = new PopupWithForm({
  popupFormSelectors: popupFormSelectors,
  popupSelector: popupAddCard,
  callbackSubmitForm: ({name, link}) => {

    addCard.renderLoading(true)

    api.addNewCard(name, link)
      .then((result) => {
        //РАХИМ ДОБАВЬ СЮДА МЕТОД С КЛАССА КАРД
        cards.prepend(Card.createCard())
        addCard.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { addCard.renderLoading(false) })
  }
})

//Открытие попапа добавления новой карточки
buttonPlus.addEventListener('click', () => addCard.open())

//Попап добавления новой аватарки
const changeAvatar = new PopupWithForm( {
  popupFormSelectors: popupFormSelectors,
  popupSelector: popupAvatar,
  callbackSubmitForm: ({avatarLink}) => {

    changeAvatar.renderLoading(true)

    api.updateAvatar(avatarLink)
      .then((result) => {
        avatar.setAttribute('src', result.avatar)
        changeAvatar.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { changeAvatar.renderLoading(false) })
  }
})

//Открытие попапа обновления аватара
avatarRedact.addEventListener('click', () =>{changeAvatar.open()})

enableValidation(obj)

//Создаем копию класса UserInfo и передаем селекторы:
const user = new UserInfo(userInfoSelector)

const promiseArray = [api.getUserInfo(), api.getCards()]

Promise.all(promiseArray)
    .then(([resultUser, resultCards])  => {
      //Вызываем метод класса UserInfo и передаем в него данные о пользователе с сервера:
      user.setUserInfo(resultUser);
      resultCards.forEach(item => {cards.append(createCard(item.link, item.name, item.likes, resultUser._id, item.owner._id, item._id ))})
    })
    .catch((error) => {console.log(error)});

