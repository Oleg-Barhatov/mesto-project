import {modal, titleName, subtitleJob, picture, figcaption} from './utils.js'

function closeModal(element) {
  element.classList.remove('popup_opened'); 
}

function openModal(element) {
  element.classList.add('popup_opened'); 
  clickCloseOverlay(element);
  document.addEventListener('keydown', tapCloseEscape);
  resetError(element);
}

function resetInput(jobInput, nameInput) {
  jobInput.value = titleName.innerText;
  nameInput.value = subtitleJob.innerText;  
}

function editProfile(name, job) {
  titleName.textContent = name;
  subtitleJob.textContent = job;
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

function clickCloseOverlay(item) {
  item.addEventListener('click', evt => {
    if(evt.target === evt.currentTarget) {
      closeModal(item)
    }
  })
}

function tapCloseEscape (evt) {
  if(evt.key === 'Escape') {
    const element = document.querySelector(".popup_opened")
    closeModal(element)
  }
  document.removeEventListener('keydown', tapCloseEscape)
}

function resetError (element) {
  const iputItem = element.querySelectorAll('.popup__form');
  iputItem.forEach(item => item.classList.remove('popup__form_type_error'))
  const errorItem = element.querySelectorAll('.form__error');
  errorItem.forEach(item => item.textContent = ' ')
}

export {closeModal, openModal, resetInput, editProfile, getAtribute}