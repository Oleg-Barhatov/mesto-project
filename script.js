const popupProfile = document.querySelector(".popup_profile");
const iconsClose = document.querySelectorAll(".popup__close");

function closeModal(element) {
  element.classList.remove('popup_opened'); 
}

iconsClose.forEach(item => {
  item.addEventListener("click", event => {
    const element = event.target.closest('.popup');
    formCardSave.reset();
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

buttonRedact.addEventListener("click", () => openModal(popupProfile, resetInput(inputName, inputJob)) );
buttonPlus.addEventListener("click", () => openModal(popupAddCard) );

const popupForm = document.querySelector(".popup_profile");

function editProfile(name, job) {
  titleName.textContent = name;
  subtitleJob.textContent = job;
}

popupForm.addEventListener("submit", evt => {
  evt.preventDefault();
  editProfile(inputName.value, inputJob.value);
  closeModal(popupProfile)
});

const templateElement = document.querySelector("#templateElement")
const cards = document.querySelector(".elements");
const cardsElement = document.querySelector(".element")

function createCard (itemUrl, itemTitle) {
  const content = document.querySelector("#templateElement").content;
  const cloneElement = content.cloneNode(true);
  const cloneImage = cloneElement.querySelector(".element__image");
  const cloneTitle = cloneElement.querySelector(".element__title");
  const cloneLike = cloneElement.querySelector(".element__like-button");
  const cloneButtonDelete = cloneElement.querySelector(".element__delete-button");

  cloneImage.src = itemUrl;
  cloneImage.alt = `Изображение ${itemTitle}`;
  cloneTitle.textContent = itemTitle;

  getAtribute(cloneImage);
  liked(cloneLike);
  removeCard(cloneButtonDelete);

  return cloneElement;
}

initialCards.forEach(item => {cards.prepend(createCard(item.link, item.name))});

const formCardSave = document.querySelector('.form-place')
const titleInput = document.querySelector("#inputTitle");
const urlInput = document.querySelector("#inputLink");

formCardSave.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const urlValue = urlInput.value;

  cards.prepend(createCard(urlValue, titleValue));
  formCardSave.reset()
  closeModal(popupAddCard);
});

const buttonLike = cards.querySelector(".element__like-button");

function liked (item) {
  item.addEventListener("click", event => {
    event.target.classList.toggle("element__like-button_active");
  });
}

const buttonDeleteCard = cards.querySelectorAll(".element__delete-button");

function removeCard (item) {
  item.addEventListener("click", event => {
    event.target.closest(".element").remove();
  });
}

const cardsElementT = document.querySelector('.element')
const modal = document.querySelector(".popup_image");
const images = document.querySelectorAll(".element__image");
const picture = document.querySelector(".popup__picture");
const figcaption = document.querySelector(".popup__figcaption");

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








