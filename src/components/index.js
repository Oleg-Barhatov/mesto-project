import { popupSelectors, formSelectors, elements,
  userInfoSelector,
  popupImageSelectors, cardSelectors } from './utils.js';
import Card from './card.js';
import api from './api.js';
import PopupWithForm from './popupWithForm.js';
import popupWithImage from './popupWithImage.js';
import UserInfo from './userInfo.js';
import '../pages/index.css';
import Section from "./section";
import FormValidator from "./validate";


function likedByMe(cardObj,userId){
    for (const like of cardObj.likes){
        if (like["_id"] === userId){
            return true
        }
    }
    return false
}

//Попап редактирования профиля
const editFrofile = new PopupWithForm({
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupProfile,
  callbackSubmitForm: ({name, about}) => {

    editFrofile.renderLoading(true)

    api.setUserInfo(name, about)
      .then((result) => {
        document.querySelector(userInfoSelector.name).textContent = result.name;
        document.querySelector(userInfoSelector.about).textContent = result.about;
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
  const userInfo = user.getUserInfo();
  elements.nameInput.value = userInfo.userName;
  elements.aboutInput.value = userInfo.userAbout;
})

//Попап добавления новой карточки
const addCard = new PopupWithForm({
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupAddCard,
  callbackSubmitForm: ({name, link}) => {

    addCard.renderLoading(true)

    api.addNewCard(name, link)
      .then((result) => {
        const section = new Section({items:[], renderer: (item) =>{
            return Card.createCard(cardSelectors, item,
                api.putCardLike,
                api.rmvCardLike,
                api.deleteCard,
                imagePopup.open,
                {trash: true, liked: false}).node
            }}, elements.cardsSelector)
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
elements.buttonPlus.addEventListener('click', () => addCard.open())

//Попап добавления новой аватарки
const changeAvatar = new PopupWithForm( {
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupAvatar,
  callbackSubmitForm: ({avatarLink}) => {

    changeAvatar.renderLoading(true)

    api.updateAvatar(avatarLink)
      .then((result) => {
        document.querySelector(userInfoSelector.avatar).setAttribute('src', result.avatar)
        changeAvatar.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { changeAvatar.renderLoading(false) })
  }
})

const changeAvatarValidation = new FormValidator(formSelectors, document.querySelector(popupSelectors.popupAvatar))
changeAvatarValidation.enableValidation()

//Открытие попапа обновления аватара
elements.avatarRedact.addEventListener('click', () =>{changeAvatar.open()})



//Создаем копию класса UserInfo и передаем селекторы:
const user = new UserInfo( userInfoSelector)

const imagePopup = new popupWithImage(popupSelectors.popupImage, popupImageSelectors)

const promiseArray = [api.getUserInfo(), api.getCards()]


Promise.all(promiseArray)
    .then(([resultUser, items])  => {
        //Вызываем метод класса UserInfo и передаем в него данные о пользователе с сервера:
        user.setUserInfo(resultUser);
        const section = new Section({
            items,
            renderer: (item) => {
                const trash = item.owner["_id"] === resultUser["_id"]
                const liked = likedByMe(item, resultUser["_id"])
                return Card.createCard(cardSelectors, item,
                    api.putCardLike,
                    api.rmvCardLike,
                    api.deleteCard,
                    imagePopup.open,
                    {trash,liked}).node
            }
        }, elements.cardsSelector)
        section.renderItems(true)
    })
    .catch((error) => {console.log(error)});

