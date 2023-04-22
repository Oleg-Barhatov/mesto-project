import {popupProfile, formCardSave, popupForm, buttonRedact, buttonPlus,
  inputName,inputJob, popupAddCard,titleInput,urlInput,cards, obj, popups} from './utils.js';
import {closeModal, openModal, resetInput, editProfile, disabledButton} from './modal.js';
import {initialCards, createCard} from './card.js';
import {enableValidation} from './validate.js';
import '../pages/index.css';

popups.forEach(item => {
  item.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup_opened')){
      closeModal(item)
    }
    if(evt.target.classList.contains('popup__close')){
      closeModal(item)
    }
  })
})

buttonRedact.addEventListener("click", () => openModal(popupProfile, resetInput(inputName, inputJob)) );
buttonPlus.addEventListener("click", () => {openModal(popupAddCard), formCardSave.reset(), disabledButton(formCardSave)});

popupForm.addEventListener("submit", evt => {
  evt.preventDefault();
  editProfile(inputName.value, inputJob.value);
  closeModal(popupProfile)
});

initialCards.forEach(item => {cards.prepend(createCard(item.link, item.name))});

formCardSave.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const urlValue = urlInput.value;
  cards.prepend(createCard(urlValue, titleValue));
  formCardSave.reset()
  closeModal(popupAddCard);
});

enableValidation(obj)