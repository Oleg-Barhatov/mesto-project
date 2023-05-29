import Popup from "./Popup";

export default class popupWithImage extends Popup {
  constructor(popupSelector, popupImageSelectors){
    super(popupSelector);
    
    //Забираем изображение и подпись
    this._popupImage = this._popup.querySelector(popupImageSelectors.picture);
    this._popupFigcaption = this._popup.querySelector(popupImageSelectors.caption);

  }

  //Перезаписываем родитель метод open и передаем в него name и link
  open = (name, link)  =>{
    this._popupImage.alt = name;
    this._popupFigcaption.textContent = name;
    this._popupImage.src = link;

    //Вызываем родительский метод open
    super.open()
  }
}