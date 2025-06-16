import { editPicSelector } from "../utils/constants.js";
export class EditUserImg {
  constructor({ popup }) {
    this._popup = document.querySelector(popup);
  }
  generateForm() {
    this._element = this._getTemplate();
    return this._element;
  }

  _getTemplate() {
    const editPicElement = this._popup.content
      .querySelector(editPicSelector)
      .cloneNode(true);
    return editPicElement;
  }
}
