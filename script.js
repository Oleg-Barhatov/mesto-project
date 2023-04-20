// const popupProfile = document.querySelector(".popup_profile");
// const iconsClose = document.querySelectorAll(".popup__close");



// function closeModal(element) {
//   element.classList.remove('popup_opened'); 
// }

// iconsClose.forEach(item => {
//   item.addEventListener("click", event => {
//     const element = event.target.closest('.popup');
//     closeModal(element)
//   })
// })

// function openModal(element) {
//   element.classList.add('popup_opened'); 
//   clickCloseOverlay(element);
//   document.addEventListener('keydown', tapCloseEscape);
//   resetError(element);
// }

// const titleName = document.querySelector(".profile__title");
// const subtitleJob = document.querySelector(".profile__subtitle");

// function resetInput(jobInput, nameInput) {
//   jobInput.value = titleName.innerText;
//   nameInput.value = subtitleJob.innerText;  
// }

// const buttonRedact = document.querySelector(".profile__redact-button");
// const buttonPlus = document.querySelector(".profile__add-button");
// const inputName = document.querySelector(".popup__form-Name");
// const inputJob = document.querySelector(".popup__form-Job");
// const popupAddCard = document.querySelector('.popup_place')

// buttonRedact.addEventListener("click", () => openModal(popupProfile, resetInput(inputName, inputJob)) );
// buttonPlus.addEventListener("click", () => {openModal(popupAddCard), formCardSave.reset()});

// const popupForm = document.querySelector(".popup_profile");

// function editProfile(name, job) {
//   titleName.textContent = name;
//   subtitleJob.textContent = job;
// }

// popupForm.addEventListener("submit", evt => {
//   evt.preventDefault();
//   editProfile(inputName.value, inputJob.value);
//   closeModal(popupProfile)
// });

// const templateElement = document.querySelector("#templateElement")
// const cards = document.querySelector(".elements");
// const cardsElement = document.querySelector(".element")

// function createCard (itemUrl, itemTitle) {
//   const content = document.querySelector("#templateElement").content;
//   const cloneElement = content.cloneNode(true);
//   const cloneImage = cloneElement.querySelector(".element__image");
//   const cloneTitle = cloneElement.querySelector(".element__title");
//   const cloneLike = cloneElement.querySelector(".element__like-button");
//   const cloneButtonDelete = cloneElement.querySelector(".element__delete-button");

//   cloneImage.src = itemUrl;
//   cloneImage.alt = `Изображение ${itemTitle}`;
//   cloneTitle.textContent = itemTitle;

//   getAtribute(cloneImage);
//   liked(cloneLike);
//   removeCard(cloneButtonDelete);

//   return cloneElement;
// }

// initialCards.forEach(item => {cards.prepend(createCard(item.link, item.name))});

// const formCardSave = document.querySelector('.form-place')
// const titleInput = document.querySelector("#inputTitle");
// const urlInput = document.querySelector("#inputLink");

// formCardSave.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const titleValue = titleInput.value;
//   const urlValue = urlInput.value;

//   cards.prepend(createCard(urlValue, titleValue));
//   formCardSave.reset()
//   closeModal(popupAddCard);
// });

// const buttonLike = cards.querySelector(".element__like-button");

// function liked (item) {
//   item.addEventListener("click", event => {
//     event.target.classList.toggle("element__like-button_active");
//   });
// }

// const buttonDeleteCard = cards.querySelectorAll(".element__delete-button");

// function removeCard (item) {
//   item.addEventListener("click", event => {
//     event.target.closest(".element").remove();
//   });
// }

// const cardsElementT = document.querySelector('.element')
// const modal = document.querySelector(".popup_image");
// // const images = document.querySelectorAll(".element__image");
// // const picture = document.querySelector(".popup__picture");
// const figcaption = document.querySelector(".popup__figcaption");

// function getAtribute (item) {
//   item.addEventListener("click", event => {
//     const targetEvent = event.target;
//     const titleCard = targetEvent.closest('.element').querySelector('.element__title');
    
//     picture.src = targetEvent.getAttribute('src');
//     picture.alt = targetEvent.getAttribute('alt'); 
//     figcaption.textContent = titleCard.textContent;

//     openModal(modal)
//   });
// }


//Валидация форм
//добавление ошибки
// const addInputError = (formItem, inputItem, errorMessage) => {
//   const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
//   inputItem.classList.add(obj.inputItemError);
//   inputNameError.textContent = errorMessage;
//   inputNameError.classList.add(obj.inputTextError);
// }
// //удаление ошибки
// const deleteInputError = (formItem, inputItem) => {
//   const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
//   inputItem.classList.remove(obj.inputItemError);
//   inputNameError.classList.remove(obj.inputTextError);
//   inputNameError.textContent = ' ';
// }

// const inputValid = (formItem, inputItem) => {
//   //Регулярка
//   if (inputItem.validity.patternMismatch) {
//     inputItem.setCustomValidity(inputItem.dataset.errorMessage);
//   } else {
//       inputItem.setCustomValidity("");
//     }
//   //Станд ошибки
//   if(!inputItem.validity.valid){
//     addInputError(formItem, inputItem, inputItem.validationMessage);
//   } else {
//       deleteInputError(formItem, inputItem);
//     } 
// }

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(obj.inputList));
//   const buttonElement = formElement.querySelector(obj.buttonElement);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach(inputItem => {
//     inputItem.addEventListener('input', () => {
//       inputValid(formElement, inputItem)
//       toggleButtonState(inputList, buttonElement)
//     });
//   });
// }

// const hasInvalidInput = (inputItem) => {
//   return inputItem.some(item => !item.validity.valid)
// };

// const toggleButtonState = (inputItem, buttonElement) => {
//   if (hasInvalidInput(inputItem)) {
//         buttonElement.disabled = true;
//         buttonElement.classList.add(obj.inactiveButtonElement);
//   } else {
//         buttonElement.disabled = false;
//         buttonElement.classList.remove(obj.inactiveButtonElement);
//     }
// };

// const obj = {
//   formList: '.popup__forms',
//   inputList: '.popup__form',
//   buttonElement: '.popup__save-button',
//   inactiveButtonElement: 'popup__save-button_disable',
//   inputItemError: 'popup__form_type_error',
//   inputTextError: 'popup__form-error'
// }

// const enableValidation = (obj) => {
//   const formList = Array.from(document.querySelectorAll(obj.formList));
//   formList.forEach(formElement => setEventListeners(formElement));
// }

// enableValidation(obj)

// function clickCloseOverlay(item) {
//   item.addEventListener('click', evt => {
//     if(evt.target === evt.currentTarget) {
//       closeModal(item)
//     }
//   })
// }

// function tapCloseEscape (evt) {
//   if(evt.key === 'Escape') {
//     const element = document.querySelector(".popup_opened")
//     closeModal(element)
//   }
//   document.removeEventListener('keydown', tapCloseEscape)
// }

// function resetError (element) {
//   const iputItem = element.querySelectorAll('.popup__form');
//   iputItem.forEach(item => item.classList.remove('popup__form_type_error'))
//   const errorItem = element.querySelectorAll('.form__error');
//   errorItem.forEach(item => item.textContent = ' ')
// }


