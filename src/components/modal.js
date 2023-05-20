import { titleName, subtitleJob, picture, figcaption, avatar } from './utils.js'


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

  });
}

function resetError (element) {
  const iputItem = element.querySelectorAll('.popup__form');
  iputItem.forEach(item => item.classList.remove('popup__form_type_error'))
  const errorItem = element.querySelectorAll('.form__error');
  errorItem.forEach(item => item.textContent = ' ');
}


export {resetInput, editProfile, getAtribute, resetError}

