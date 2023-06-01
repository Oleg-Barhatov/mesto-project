import {
    cardSelectors,
    elements,
    formSelectors,
    popupImageSelectors,
    popupSelectors,
    userInfoSelector
} from '../utils/utils.js';
import Card from '../components/Card.js';
import api from '../components/Api.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";


function likedByMe(cardObj,userId){
    for (const like of cardObj.likes){
        if (like["_id"] === userId){
            return true
        }
    }
    return false
}

function createCard(item, options){
    const card = new Card(item, cardSelectors, cardCallbacks)
    return card.createCard(options)
}

//Попап редактирования профиля
const editFrofile = new PopupWithForm({
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupProfile,
  callbackSubmitForm: ({name, about}) => {

    editFrofile.renderLoading(true)

    api.setUserInfo(name, about)
      .then((result) => {

        user.setUserInfo(result)

        editFrofile.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { editFrofile.renderLoading(false) })
  }
})
const editProfileValidation = new FormValidator(formSelectors, document.querySelector(popupSelectors.popupProfile))
editProfileValidation.enableValidation()

//Открытие попапа редактирования профиля
elements.buttonRedact.addEventListener('click', () => {
  editFrofile.open(); 
  editFrofile.setInputValues(user.getUserInfo());
  editProfileValidation.resetErrors(false)
})

//Попап добавления новой карточки
const addCard = new PopupWithForm({
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupAddCard,
  callbackSubmitForm: ({name, link}) => {

    addCard.renderLoading(true)

    api.addNewCard(name, link)
      .then((result) => {
          section.renderer = ()=>createCard(result, {trash:true, liked:false})
          section.addItem(result)
          addCard.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { addCard.renderLoading(false) })
  }
})

const addPopupValidation = new FormValidator(formSelectors,
    document.querySelector(popupSelectors.popupAddCard))
addPopupValidation.enableValidation()

//Открытие попапа добавления новой карточки
elements.buttonPlus.addEventListener('click', () => {
  addCard.open()
  addPopupValidation.resetErrors(false)
})

//Попап добавления новой аватарки
const changeAvatar = new PopupWithForm( {
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupAvatar,
  callbackSubmitForm: ({avatarLink}) => {

    changeAvatar.renderLoading(true)

    api.updateAvatar(avatarLink)
      .then((result) => {
        user.setUserInfo(result)
        changeAvatar.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { changeAvatar.renderLoading(false) })
  }
})

const changeAvatarValidation = new FormValidator(formSelectors, document.querySelector(popupSelectors.popupAvatar))
changeAvatarValidation.enableValidation()

//Открытие попапа обновления аватара
elements.avatarRedact.addEventListener('click', () =>{
  changeAvatar.open()
  changeAvatarValidation.resetErrors(false)
})



//Создаем копию класса UserInfo и передаем селекторы:
const user = new UserInfo( userInfoSelector)

const imagePopup = new PopupWithImage(popupSelectors.popupImage, popupImageSelectors)

const promiseArray = [api.getUserInfo(), api.getCards()]

const cardCallbacks = {onRmvLike: api.rmvCardLike, onSetLike: api.putCardLike,
    onDelete:api.deleteCard, onImageClick: imagePopup.open
}

const section = new Section({}, elements.cardsSelector)

Promise.all(promiseArray)
    .then(([resultUser, items])  => {
        //Вызываем метод класса UserInfo и передаем в него данные о пользователе с сервера:
        user.setUserInfo(resultUser);
        section.renderer = (item) => {
            const trash = item.owner["_id"] === user.getUseriD()
            const liked = likedByMe(item, user.getUseriD())
            return createCard(item, {trash, liked})
        }
        section.items = items
        section.renderItems(true)
    })
    .catch((error) => {console.log(error)});

