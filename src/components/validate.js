import {obj} from './utils.js';

const addInputError = (formItem, inputItem, errorMessage) => {
  const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
  inputItem.classList.add(obj.inputItemError);
  inputNameError.textContent = errorMessage;
  inputNameError.classList.add(obj.inputTextError);
}

const deleteInputError = (formItem, inputItem) => {
  const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
  inputItem.classList.remove(obj.inputItemError);
  inputNameError.classList.remove(obj.inputTextError);
  inputNameError.textContent = ' ';
}

const inputValid = (formItem, inputItem) => {
  if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.errorMessage);
  } else {
      inputItem.setCustomValidity("");
    }
  if(!inputItem.validity.valid){
    addInputError(formItem, inputItem, inputItem.validationMessage);
  } else {
      deleteInputError(formItem, inputItem);
    } 
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputList));
  const buttonElement = formElement.querySelector(obj.buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputItem => {
    inputItem.addEventListener('input', () => {
      inputValid(formElement, inputItem)
      toggleButtonState(inputList, buttonElement)
    });
  });
}

const hasInvalidInput = (inputItem) => {
  return inputItem.some(item => !item.validity.valid)
};

const toggleButtonState = (inputItem, buttonElement) => {
  if (hasInvalidInput(inputItem)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(obj.inactiveButtonElement);
  } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj.inactiveButtonElement);
    }
};


const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formList));
  formList.forEach(formElement => setEventListeners(formElement));
}


export {enableValidation}