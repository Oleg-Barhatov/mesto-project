import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor( {popupFormSelectors, popupSelector, callbackSubmitForm} ){
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    //Получаем форму попапа:
    this._popupForm = this._popup.querySelector(popupFormSelectors.form)
    //Получаем ВСЕ инпуты формы:
    this._formInputs = this._popupForm.querySelectorAll(popupFormSelectors.input)
    //Получаем кнопку формы:
    this._formButton = this._popupForm.querySelector(popupFormSelectors.submitButton)
    //Фиксируем текст снопки
    this._submitBtnText = this._formButton.textContent
    //Добавляем слушатель:
    this.setEventListeners();
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

  setInputValues(data) {
    this._formInputs.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  //Публичной метод состояния кнопки при отправке данных:
  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._formButton.textContent = loadingText;
    } else {
      this._formButton.textContent = this._submitBtnText;
    }
  }

  //Перезаписываем родительский метод:
  close() {
    super.close()
    //Добавяем сброс формы:
    this._popupForm.reset()

  }

  setEventListeners() {
    super.setEventListeners() 
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      //Передаем в callback объект со значениями полей инпута и работаем с ним в index.js с методом api
      this._callbackSubmitForm(this._getInputValues())
    })
  }
}

