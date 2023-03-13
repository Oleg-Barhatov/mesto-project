//Здравствуйте, был бы признателен побольше замечаний в коде, первый раз писал JS код
//хочу понимать, что можно улучшить, спасибо за обратную связь!

const popup = document.querySelector(".popup");
const iconClose = document.querySelectorAll(".popup__close");

function closeModal(element) {
  element.classList.remove('popup_opened'); 
}

iconClose.forEach(item => {
  item.addEventListener("click", event => {
    const element = event.target.closest('.popup')
    closeModal(element)
  })
})

function openModal(element) {
  element.classList.add('popup_opened'); 
}

const titleName = document.querySelector(".profile__title");
const subtitleJob = document.querySelector(".profile__subtitle");

function resetInput(jobInput, nameInput) {
  jobInput.value = titleName.innerText;
  nameInput.value = subtitleJob.innerText;
}

const buttonRedact = document.querySelector(".profile__redact-button");
const buttonPlus = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".popup__form-Name");
const inputJob = document.querySelector(".popup__form-Job");
const popupAddCard = document.querySelector('.popup_place')

buttonRedact.addEventListener("click", () => openModal(popup, resetInput(inputName, inputJob)) );
buttonPlus.addEventListener("click", () => openModal(popupAddCard) );

const popupForm = document.querySelector(".popup__forms");

function editProfile(name, job) {
  titleName.textContent = name;
  subtitleJob.textContent = job;
}

popupForm.addEventListener("submit", evt => {
  evt.preventDefault();
  editProfile(inputName.value, inputJob.value);
  closeModal(popup)
});


const templateElement = document.querySelector("#templateElement")
const cards = document.querySelector(".elements");
const cardsElement = document.querySelector(".element")

function createCard (template, copyElem, add, item ) {
  template.сontent;
  const cloneElement = copyElem.cloneNode(true);

  cloneElement.querySelector(".element__image").src = item.link;
  cloneElement.querySelector(".element__image").alt = `Изображение ${item.name}`;
  cloneElement.querySelector(".element__title").textContent = item.name;

  add.prepend(cloneElement);
}

initialCards.forEach((item) => {
  createCard (templateElement, cardsElement, cards, item)
});

const buttonCardSave = document.querySelector('#buttonCardSave')
const title = document.querySelector("#inputTitle");
const link = document.querySelector("#inputLink");

function addCard(inputTitle, inputLink) {
  templateElement.сontent;

  const cloneElement = cardsElement.cloneNode(true);
  const like = cloneElement.querySelector(".element__like-button");
  const buttonDelete = cloneElement.querySelector(".element__delete-button");
  const imageCard = cloneElement.querySelector(".element__image")
  const titleCard = cloneElement.querySelector(".element__title")
  

  titleCard.textContent = inputTitle;
  imageCard.src = inputLink;
  imageCard.alt = `Изображение ${inputTitle}`;
  
  liked(like);
  removeCard(buttonDelete);
  getAtribute(imageCard)
  
  cards.prepend(cloneElement);
}

buttonCardSave.addEventListener("click", (evt) => {
  evt.preventDefault();

  addCard(title.value, link.value);

  title.value = "";
  link.value = "";

  closeModal(popupAddCard);
});

const buttonLike = cards.querySelectorAll(".element__like-button");

function liked (item) {
  item.addEventListener("click", event => {
    event.target.classList.toggle("element__like-button_active");
  });
}

buttonLike.forEach( item => {liked(item)} );

const buttonDeleteCard = cards.querySelectorAll(".element__delete-button");

function removeCard (item) {
  item.addEventListener("click", event => {
    event.target.closest(".element").remove();
  });
}

buttonDeleteCard.forEach( item => {removeCard(item)} );

const cardsElementT = document.querySelector('.element')
const modal = document.querySelector(".popup_image");
const images = document.querySelectorAll(".element__image");
const picture = document.querySelector(".popup__picture");
const figcaption = document.querySelector(".popup__figcaption");

function getAtribute (item, image, signText) {
  item.addEventListener("click", event => {
    const targetEvent = event.target;
    const titleCard = targetEvent.closest('.element').querySelector('.element__title');
    
    picture.src = targetEvent.getAttribute('src');
    picture.alt = targetEvent.getAttribute('alt'); 
    figcaption.textContent = titleCard.textContent;

    openModal(modal)
  });
}

images.forEach( item => {getAtribute(item)} );







