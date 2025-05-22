import { formInputSelector, popUpNewImgSelector } from "../utils/constants.js";
import { PopUp } from "../Components/Popup.js";
export class PopUpWithForms extends PopUp {
  constructor({ popup, handleFormSubmit }) {
    super({ popup });
    this._handleFormSubmit = handleFormSubmit;
  }

  _getTemplate() {
    const popUpElement = this._popup.content
      .querySelector(popUpNewImgSelector)
      .cloneNode(true);

    return popUpElement;
  }

  _setEventListener() {
    this._element.firstElementChild.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._element.lastElementChild.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.close();
    });
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close() : "";
    });
    this._handleEscClose();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(formInputSelector);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._element.remove() : "";
    });
  }

  generateForm() {
    this._element = this._getTemplate();
    this._setEventListener();
    return this._element;
  }

  close() {
    this._element.remove();
    this._element.firstElementChild.reset();
  }
}
