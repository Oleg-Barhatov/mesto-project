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

export const elements = {
    aboutInput : document.querySelector('.popup__form-Job'),
    nameInput : document.querySelector('.popup__form-Name'),
    buttonRedact : document.querySelector(".profile__redact-button"),
    buttonPlus : document.querySelector(".profile__add-button"),
    avatarRedact : document.querySelector(".profile__container"),
    cardsSelector: ".elements",
}

//Селекторы для валидации
export const formSelectors = {
    form: '.popup__forms',
    input: '.popup__form',
    submitButton: '.popup__save-button',
    disabledButton: 'popup__save-button_disable',
    inputError: '.popup__form_type_error',
    errorSpan: '.form__error',
    errorSpanSuffix: "-error"
}


export const cardSelectors = {
    template: "#templateElement",
    element:".element",
    image: ".element__image",
    title: ".element__title",
    likeBtn: ".element__like-button",
    likeBtnActive: "element__like-button_active",
    likeCounter: ".element__like-count",
    delBtn: ".element__delete-button",
}
export const popupSelectors = {
    popupImage: ".popup_image",
    popupAvatar: ".popup_avatar",
    popupAddCard: ".popup_place",
    popupProfile: ".popup_profile"
}
 