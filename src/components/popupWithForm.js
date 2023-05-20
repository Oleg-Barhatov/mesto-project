import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callbackSubmitForm}){
    super(popupSelector);

    this._callbackSubmitForm = callbackSubmitForm;
    //Получаем форму попапа:
    this._popupForm = this._popupSelector.querySelector('.popup__forms')
    //Получаем ВСЕ инпуты формы:
    this._formInputs = this._popupForm.querySelectorAll('.popup__form')
    //Получаем кнопку формы
    this._formButton = this._popupForm.querySelector('.popup__save-button')
  }

//Получаем данные полей инпутов:
  _getInputValues() {
    //Создаем пустой обьект, где храним значения инпутов:
    this._inputValues ={}
    //Перебираем инпуты и получаем значения, добавляем в обьект, name = атрибут инпута:
    this._formInputs.forEach(input => {
      this._inputValues[input.name] = input.value
    });
    //Возвращаем обьект:
    return this._inputValues
  }
  
  //Публичной метод состояния кнопки при отправке данных:
  renderLoading(isLoading) {
    if (isLoading) {
      this._formButton.textContent = 'Сохранение...';
    }
    else {
      this._formButton.textContent = 'Сохранить';
    }
  }

  //Перезаписываем родительский метод:
  setEventListeners() {
    super.setEventListeners();

    //Добавляем слушатель события формы submit
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      //Передаем в callback объект со значениями полей инпута и работаем с ним в index.js с методом api
      this._callbackSubmitForm(this._getInputValues())
    })
  }

  //Перезаписываем родительский метод:
  close() {
    super.close()
    //Добавяем сброс формы:
    this._popupForm.reset()
    //Добавляем сброс кнопки:
    this._formButton.classList.add('popup__save-button_disable');
    this._formButton.setAttribute('disabled', true);
  }
}

