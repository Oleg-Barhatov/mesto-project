import {getAtribute} from './modal.js';
import {initialCards} from './utils.js';

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

function liked (item) {
  item.addEventListener("click", event => {
    event.target.classList.toggle("element__like-button_active");
  });
}

function removeCard (item) {
  item.addEventListener("click", event => {
    event.target.closest(".element").remove();
  });
}


export {initialCards, liked, removeCard, createCard}
