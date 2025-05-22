import {
  formInputSelector,
  popUpUserInfoSelector,
} from "../utils/constants.js";
export class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  _getTemplate() {
    const newUserInfoTemplate = document
      .querySelector(".edit-info__template")
      .content.querySelector(popUpUserInfoSelector)
      .cloneNode(true);
    return newUserInfoTemplate;
  }

  _setEventListener() {
    this._element.firstElementChild.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputList = this._element.querySelectorAll(formInputSelector);
      document.querySelector(this._userName).textContent =
        this._inputList[0].value;
      document.querySelector(this._userJob).textContent =
        this._inputList[1].value;
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
    console.log(this._inputList);
  }

  generateForm() {
    this._element = this._getTemplate();
    this._setEventListener();
    return this._element;
  }

  getUserInfo() {
    this._currentUserInfo = {};
    this._currentUserInfo["User-Name"] = document.querySelector(
      this._userName
    ).textContent;
    this._currentUserInfo["User-Occupation"] = document.querySelector(
      this._userJob
    ).textContent;
    return console.log(this._currentUserInfo);
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._element.remove() : "";
    });
  }

  close() {
    this._element.remove();
    this._element.firstElementChild.reset();
  }
}
