const addInputError = (formItem, inputItem, errorMessage, obj) => {
  const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
  inputItem.classList.add(obj.inputItemError);
  inputNameError.textContent = errorMessage;
  inputNameError.classList.add(obj.inputTextError);
}

const deleteInputError = (formItem, inputItem, obj) => {
  const inputNameError = formItem.querySelector(`.${inputItem.id}-error`) 
  inputItem.classList.remove(obj.inputItemError);
  inputNameError.classList.remove(obj.inputTextError);
  inputNameError.textContent = ' ';
}

const inputValid = (formItem, inputItem, obj) => {
  if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.errorMessage);
  } else {
      inputItem.setCustomValidity("");
    }
  if(!inputItem.validity.valid){
    addInputError(formItem, inputItem, inputItem.validationMessage, obj);
  } else {
      deleteInputError(formItem, inputItem, obj);
    } 
}

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputList));
  const buttonElement = formElement.querySelector(obj.buttonElement);
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach(inputItem => {
    inputItem.addEventListener('input', () => {
      inputValid(formElement, inputItem, obj)
      toggleButtonState(inputList, buttonElement, obj)
    });
  });
}

const hasInvalidInput = (inputItem) => {
  return inputItem.some(item => !item.validity.valid)
};

const toggleButtonState = (inputItem, buttonElement, obj) => {
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
  formList.forEach(formElement => setEventListeners(formElement, obj));
}


export {enableValidation}