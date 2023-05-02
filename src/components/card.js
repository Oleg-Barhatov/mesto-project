import { removeCardServer, likeToggle } from './api.js';
import { getAtribute, openModal, closeModal } from './modal.js';
import { popupDeleteCard, popupFormDelete } from './utils.js';

function createCard (itemUrl, itemTitle, itemLike, myID, ownerID, itemID) {
  const content = document.querySelector("#templateElement").content;
  const cloneElement = content.cloneNode(true);
  const cloneImage = cloneElement.querySelector(".element__image");
  const cloneTitle = cloneElement.querySelector(".element__title");
  const cloneLike = cloneElement.querySelector(".element__like-button");
  const cloneLikeCount = cloneElement.querySelector(".element__like-count");
  const cloneButtonDelete = cloneElement.querySelector(".element__delete-button");
  cloneImage.src = itemUrl;
  cloneImage.alt = `Изображение ${itemTitle}`;
  cloneTitle.textContent = itemTitle;
  getAtribute(cloneImage);
  checkLiked(itemLike, myID, cloneLikeCount, cloneLike)
  liked(cloneLike, itemID, cloneLikeCount);
  removeButtonDelete(cloneButtonDelete, myID, ownerID)
  openPopupDeleteCard(cloneButtonDelete, popupFormDelete, itemID)
  return cloneElement;
}

function checkLiked (itemLike, myID, cloneLikeCount, cloneLike) {
    cloneLikeCount.textContent = itemLike.length;
    itemLike.forEach (item => {if(item._id === myID){
      cloneLike.classList.toggle("element__like-button_active");
    }})
}

function liked (cloneLike, itemID, cloneLikeCount) {
  cloneLike.addEventListener("click", () => {
    const toggleLike = cloneLike.classList.contains('element__like-button_active') ? 'DELETE' : 'PUT';
    likeToggle(itemID, toggleLike)
      .then( res => res.json())
      .then(result => {
        cloneLikeCount.textContent = result.likes.length;
        cloneLike.classList.toggle("element__like-button_active");
      })
      .catch(error => {
        console.log(error); 
      });
  });
}


function openPopupDeleteCard(cloneButtonDelete, popupFormDelete, itemID) {
  cloneButtonDelete.addEventListener("click", (evt) => {
    openModal(popupDeleteCard)
    removeServerCard(popupFormDelete, itemID, evt)
  }) 
}

function removeServerCard (popupFormDelete, itemID, evt) {
  popupFormDelete.addEventListener("submit", event => {
    event.preventDefault();
    removeCardServer(itemID)
      .then(res => res.json())
      .then(() => {
        evt.target.closest('.element').remove()
      })
      .catch(error => {
        console.log(error); 
      });
    closeModal(popupDeleteCard)
  });
}

function removeButtonDelete (cloneButtonDelete, myID, ownerID,) {
  if(myID !== ownerID) 
    cloneButtonDelete.remove()
}

export { createCard }
