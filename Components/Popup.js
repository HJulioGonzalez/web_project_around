import { popUpCloseButtonSelector, popUpSelector } from "../utils/constants.js";
export class PopUp {
  constructor({ popup }) {
    this._popup = document.querySelector(popup);
  }

  _popUpTemplate() {
    const popUpElement = this._popup.content
      .querySelector(popUpSelector)
      .cloneNode(true);
    return popUpElement;
  }

  _handleEscClose(element) {
    document.addEventListener(
      "keydown",
      (evt) => {
        evt.key === "Escape" ? element.remove() : "";
      },
      { once: true }
    );
  }

  open() {
    this._element = this._popUpTemplate();
    this._popUpContainer = this._popup.parentElement;
    this._popUpContainer.append(this._element);
    this._handleEscClose(this._element);
    return this;
  }

  close() {
    this.setEventListeners();
    return this;
  }

  setEventListeners() {
    this._popUpcloseButton = this._element.querySelector(
      popUpCloseButtonSelector
    );
    this._popUpcloseButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._element.remove();
    });
    this._element.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.target === evt.currentTarget ? this._element.remove() : "";
    });
  }
}
