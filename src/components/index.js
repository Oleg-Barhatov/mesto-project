import {popupProfile, iconsClose, formCardSave, popupForm, buttonRedact, buttonPlus,
  inputName,inputJob, popupAddCard,titleInput,urlInput,cards, obj} from './utils.js';
import {closeModal, openModal, resetInput, editProfile} from './modal.js';
import {initialCards, createCard} from './card.js';
import {enableValidation} from './validate.js';
import '../pages/index.css';

iconsClose.forEach(item => {
  item.addEventListener("click", event => {
    const element = event.target.closest('.popup');
    closeModal(element)
  })
})

buttonRedact.addEventListener("click", () => openModal(popupProfile, resetInput(inputName, inputJob)) );
buttonPlus.addEventListener("click", () => {openModal(popupAddCard), formCardSave.reset()});

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