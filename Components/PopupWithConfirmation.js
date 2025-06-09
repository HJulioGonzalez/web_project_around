import {
  popUpConfirmationSelector
} from "../utils/constants.js";
import { PopUp } from "../Components/Popup.js";

export class PopupWithConfirmation extends PopUp {
    constructor({popup}){
        super({popup});
    }

_getTemplate() {
    const popUpConfirmationElement = this._popup.content
      .querySelector(popUpConfirmationSelector)
      .cloneNode(true);
    

    return popUpConfirmationElement;
  }

generateForm(){
    this._element = this._getTemplate();
    return this._element
}

_setEventListener(){}

_handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._element.remove() : "";
    });
  }
}