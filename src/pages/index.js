import { popupSelectors, formSelectors, elements,
  userInfoSelector,
  popupImageSelectors, cardSelectors } from '../components/utils/utils.js';
import Card from '../components/Card.js';
import api from '../components/api.js';
import PopupWithForm from '../components/popupWithForm.js';
import popupWithImage from '../components/popupWithImage.js';
import UserInfo from '../components/userInfo.js';
import './index.css';
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";


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
})

//Попап добавления новой карточки
const addCard = new PopupWithForm({
  popupFormSelectors: formSelectors,
  popupSelector: popupSelectors.popupAddCard,
  callbackSubmitForm: ({name, link}) => {

    addCard.renderLoading(true)

    api.addNewCard(name, link)
      .then((result) => {
        const renderer = () => {
            const card = new Card(result, cardSelectors, cardCallbacks)
            return card.createCard(
                {trash: true, liked: false})}
          section.renderer = renderer
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

const cardCallbacks = {onRmvLike: api.rmvCardLike, onSetLike: api.putCardLike,
    onDelete:api.deleteCard, onImageClick: imagePopup.open
}

const section = new Section({}, elements.cardsSelector)

Promise.all(promiseArray)
    .then(([resultUser, items])  => {
        //Вызываем метод класса UserInfo и передаем в него данные о пользователе с сервера:
        user.setUserInfo(resultUser);
        user.getUseriD()
        const section = new Section({
            items,
            renderer: (item) => {
                const trash = item.owner["_id"] === resultUser["_id"]
                const liked = likedByMe(item, resultUser["_id"])
                const card = new Card(item, cardSelectors, cardCallbacks)
                return card.createCard({trash,liked})
            }
        }, elements.cardsSelector)
        section.renderItems(true)
    })
    .catch((error) => {console.log(error)});

