//Попапы:
export const popupProfile = document.querySelector(".popup_profile");
export const popupAddCard = document.querySelector('.popup_place')
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupImage = document.querySelector(".popup_image");
//Кнопки открытия попапов на странице
export const buttonRedact = document.querySelector(".profile__redact-button");
export const buttonPlus = document.querySelector(".profile__add-button");
export const avatarRedact = document.querySelector(".profile__container");
//Селекторы для класса popupWithForm:
export const popupFormSelectors = {
  form: '.popup__forms',
  formInputs: '.popup__form',
  formButton: '.popup__save-button'
}
//Селекторы для класса UserInfo:
export const userInfoSelector = {
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__avatar"
}
//Селекторы для класса popupWithImage:
export const popupImageSelectors = {
  picture: ".popup__picture",
  caption: ".popup__figcaption"
}

export const cards = document.querySelector(".elements");
export const titleName = document.querySelector(".profile__title");
export const subtitleJob = document.querySelector(".profile__subtitle");
export const picture = document.querySelector(".popup__picture");
export const figcaption = document.querySelector(".popup__figcaption");
export const avatar = document.querySelector(".profile__avatar");
export const jobInput = document.querySelector('.popup__form-Job');
export const nameInput = document.querySelector('#input-Name');

//Селекторы для валидации
export const obj = {
    formList: '.popup__forms',
    inputList: '.popup__form',
    buttonElement: '.popup__save-button',
    inactiveButtonElement: 'popup__save-button_disable',
    inputItemError: 'popup__form_type_error',
    inputTextError: 'popup__form-error'
}
export const cardSelectors = {
    template: "#templateElement",
    element:".element",
    image: ".element__image",
    title: ".element__title",
    likeBtn: ".element__like-button",
    likeCounter: ".element__like-count",
    delBtn: ".element__delete-button",
}
export const popupSelectors = {
    popupImage: ".popup_image",
    popupAvatar: ".popup_avatar",
    popupAddCard: ".popup_place",
    popupProfile: ".popup_profile"
}
 