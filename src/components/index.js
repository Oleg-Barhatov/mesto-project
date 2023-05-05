import { popupProfile, formCardSave, buttonRedact, buttonPlus,
  inputName,inputJob, popupAddCard,titleInput,urlInput,cards, obj, popups, 
  avatarRedact, popupAvatar, popupFormAvatar, inputFormAvatar, avatar, titleName,
  subtitleJob, buttonSaveInfo, buttonSaveAvatar, buttonSaveCard  } from './utils.js';
import { closeModal, openModal, resetInput, editProfile, disabledButton, resetError } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';
import { addNewAvatar, getInfoProfile, getInitialCards, saveInfoProfile, saveNewCard } from './api.js';
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

buttonRedact.addEventListener("click", () => openModal(popupProfile, resetInput(inputName, inputJob), resetError(popupProfile)) );
buttonPlus.addEventListener("click", () => {openModal(popupAddCard), formCardSave.reset(), disabledButton(formCardSave), resetError(popupAddCard)});
avatarRedact.addEventListener('click', () => {openModal(popupAvatar), popupFormAvatar.reset(), disabledButton(popupFormAvatar), resetError(popupAvatar)})

popupProfile.addEventListener("submit", evt => {
  evt.preventDefault();
  renderLoading(true, buttonSaveInfo )
  saveInfoProfile(inputName.value, inputJob.value)
    .then(result => {
      titleName.textContent = result.name;
      subtitleJob.textContent = result.about;
      closeModal(popupProfile)
    })
    .catch((error) => { console.log(error) })
    .finally(()=> { renderLoading(false, buttonSaveInfo) })
});

formCardSave.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, buttonSaveCard )
  saveNewCard(titleInput.value, urlInput.value)
    .then(result => {
      cards.prepend(createCard(result.link, result.name, result.likes, null, null, result._id ))
      closeModal(popupAddCard) 
    })
    .catch((error) => { console.log(error) })
    .finally(()=> { renderLoading (false, buttonSaveCard) })
  
});

enableValidation(obj)

const promiseArray = [getInfoProfile(), getInitialCards()]

Promise.all(promiseArray)
    .then(([resultUser, resultCards])  => {
      editProfile(resultUser.name, resultUser.about, resultUser.avatar);
      resultCards.forEach(item => {cards.append(createCard(item.link, item.name, item.likes, resultUser._id, item.owner._id, item._id ))})
    })
    .catch((error) => {console.log(error)});

popupFormAvatar.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(true, buttonSaveAvatar )
  addNewAvatar(inputFormAvatar.value) 
    .then(result => {
      avatar.setAttribute('src', result.avatar)
      closeModal(popupAvatar)
    })
    .catch((error) => {console.log(error)})
    .finally(()=> {renderLoading (false, buttonSaveAvatar)})
})

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}