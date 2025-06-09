import { PopUp } from "../Components/Popup.js";
import {
  popUpImgLabelSelector,
  popUpImgSelector,
  townNameSelector,
} from "../utils/constants.js";
export class PopupWithImage extends PopUp {
  constructor({ popup }) {
    super({ popup });
  }

  open() {
    super.open();
    return this;
  }

  close() {
    super.close();
    return this;
  }

  setImageData(evt) {
    this._element.querySelector(popUpImgSelector).src = evt.target.src;
    this._element.querySelector(popUpImgLabelSelector).textContent =
      evt.target.parentElement.querySelector(townNameSelector).textContent;
  }
}
