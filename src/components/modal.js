import { modal, titleName, subtitleJob, picture, figcaption, avatar } from './utils.js'

function closeModal(element) {
  element.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', tapCloseEscape)
}

function openModal(element) {
  element.classList.add('popup_opened'); 
  document.addEventListener('keydown', tapCloseEscape);
}

function resetInput(jobInput, nameInput) {
  jobInput.value = titleName.innerText;
  nameInput.value = subtitleJob.innerText;  
  
}

function editProfile(name, job, photo) {
  titleName.textContent = name;
  subtitleJob.textContent = job;
  avatar.setAttribute('src', photo)
}

function getAtribute (item) {
  item.addEventListener("click", event => {
    const targetEvent = event.target;
    const titleCard = targetEvent.closest('.element').querySelector('.element__title');
    
    picture.src = targetEvent.getAttribute('src');
    picture.alt = targetEvent.getAttribute('alt'); 
    figcaption.textContent = titleCard.textContent;

    openModal(modal)
  });
}

function tapCloseEscape (evt) {
  if(evt.key === 'Escape') {
    const element = document.querySelector(".popup_opened")
    closeModal(element)
  }
}

function resetError (element) {
  const iputItem = element.querySelectorAll('.popup__form');
  iputItem.forEach(item => item.classList.remove('popup__form_type_error'))
  const errorItem = element.querySelectorAll('.form__error');
  errorItem.forEach(item => item.textContent = ' ');
}

function disabledButton (element) {
  const button = element.querySelector('.popup__save-button');
  button.classList.add('popup__save-button_disable');
  button.setAttribute('disabled', true);
} 

export {closeModal, openModal, resetInput, editProfile, getAtribute, disabledButton, resetError}

