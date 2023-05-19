import Popup from "./popup";

export default class popupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    
    //Забираем изображение и подпись
    this._popupImage = this._popupSelector.querySelector(".popup__picture");
    this._popupFigcaption = this._popupSelector.querySelector(".popup__figcaption");

  }

  //Перезаписываем родитель метод open и передаем в него name и link
  open(name, link) {
    this._popupFigcaption.alt = name;
    this._popupFigcaption.textContent = name;
    this._popupImage.src = link;
    
    //Вызываем родительский метод open
    super.open()
  }
}