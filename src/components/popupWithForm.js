import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm){
    super(popupSelector);

    this._callbackSubmitForm = callbackSubmitForm;
    //Получаем форму попапа:
    this._popupForm = this._popupSelector.querySelector('.popup__forms')
    //Получаем ВСЕ инпуты формы:
    this._formInputs = this._popupForm.querySelectorAll('.popup__form')
  }

//Получаем данные полей инпутов:
  _getInputValues() {
    //Создаем пустой обьект, где храним значения инпутов:
    this._inputValues ={}
    //Перебираем инпуты и получаем значения, добавляем в обьект, type = атрибут инпута:
    this._formInputs.forEach(input => {
      this._inputValues[input.type] = input.value
    });
    //Возвращаем обьект:
    return this._inputValues
  }

  setEventListeners() {
    super.setEventListeners();

    //Добавляем слушатель события формы submit
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();

    })
  }

  close() {
    super.close()
    //Добавяем сброс формы:
    this._popupForm.reset()
  }
}

