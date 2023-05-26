


export default class FormValidator{
  constructor(selectors, formNode) {
    this._selectors = selectors;
    this._formNode = formNode
    this._allErrorSpans = [...this._formNode.querySelectorAll(this._selectors.errorSpan)]
    this._allInputs = [...this._formNode.querySelectorAll(this._selectors.input)]
    this._btn = this._formNode.querySelector(this._selectors.submitButton)
  }

  _hasInvalidInput() {
    return this._allInputs.some((input) => {
      return !input.validity.valid
    })
  }
  resetErrors = (form) => {
    this._allErrorSpans.map(span => span.innerText = "")
    this._allInputs.map(input => input.classList.remove(this._selectors.inputError))

  }
  _renderValidation(input) {

    const msg = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
    this._setInputError(input, msg)
    this._btnSetDisabled(this._hasInvalidInput())
  }

  _setInputError(input, msg) {
    const errorSpan = this._formNode.querySelector(`.${input.id+this._selectors.errorSpanSuffix}`)
    errorSpan.innerText = msg
    if (msg) {
      input.classList.add(this._selectors.inputError)
    } else {
      input.classList.remove(this._selectors.inputError)
    }
  }

  _btnSetDisabled(state) {
    if (state) {
      this._btn.classList.add(this._selectors.disabledButton)
    } else {
      this._btn.classList.remove(this._selectors.disabledButton)
    }
    this._btn.disabled = state
  }

  enableValidation() {

    for (const input of this._allInputs) {
      input.addEventListener("input", () => {
        this._renderValidation(input)
      })
    }
  }
}