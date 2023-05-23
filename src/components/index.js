import { popupSelectors, formSelectors, elements,


  cards, obj,
  userInfoSelector, 
  popupImageSelectors, cardSelectors } from './utils.js';
import Card from './card.js';
import { enableValidation } from './validate.js';
import api from './api.js';
import PopupWithForm from './popupWithForm.js';
import popupWithImage from './popupWithImage.js';
import UserInfo from './userInfo.js';
import '../pages/index.css';


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
        //РАХИМ ДОБАВЬ СЮДА МЕТОД С КЛАССА КАРД
        cards.prepend(Card.createCard())
        addCard.close()
      })
      .catch((error) => { console.log(error) })
      .finally(() => { addCard.renderLoading(false) })
  }
})

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

//Открытие попапа обновления аватара
elements.avatarRedact.addEventListener('click', () =>{changeAvatar.open()})

// enableValidation(obj)

//Создаем копию класса UserInfo и передаем селекторы:
const user = new UserInfo( userInfoSelector)

const imagePopup = new popupWithImage(popupSelectors.popupImage, popupImageSelectors)

const promiseArray = [api.getUserInfo(), api.getCards()]

Promise.all(promiseArray)
    .then(([resultUser, resultCards])  => {
      //Вызываем метод класса UserInfo и передаем в него данные о пользователе с сервера:
      user.setUserInfo(resultUser);
      resultCards.forEach(item => {
          const card = Card.createCard(cardSelectors, item,
              api.putCardLike.bind(api),
              api.rmvCardLike.bind(api),
              api.deleteCard.bind(api),
              imagePopup.open) //Не понял как он работает у тебя, стрелочную функцию я поставил
          cards.append(card.node)})
    })
    .catch((error) => {console.log(error)});

