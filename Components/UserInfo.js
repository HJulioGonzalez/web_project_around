import {
  formInputSelector,
  popUpUserInfoSelector,
  currentUserNameSelector,
  currentUserJobSelector,
  FormRenderer,
} from "../utils/constants.js";
import { Api } from "../Components/Api.js";
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

  generateForm(baseUrl, headersAuthorization) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._element = this._getTemplate();
    this._newInfoForm = this._element.firstElementChild;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._newInfoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputList = this._element.querySelectorAll(formInputSelector);
      this.getNewProfileInfo();
      this.close();
    });
    this._newInfoForm.elements.editInfoCloseButton.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        this.close();
      }
    );
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close() : "";
    });
    this._handleEscClose();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(formInputSelector);
    console.log(this._inputList);
  }

  getNewProfileInfo() {
    this._newProfileInfo = {};
    this._newProfileInfo.name = this._newInfoForm.elements.name.value;
    this._newProfileInfo.about = this._newInfoForm.elements.job.value;
    this.setNewProfile();
  }

  setNewProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headersAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._newProfileInfo.name,
        about: this._newProfileInfo.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((newUserInfo) => {
        const nameElement = document.querySelector(currentUserNameSelector);
        const jobElement = document.querySelector(currentUserJobSelector);
        nameElement.textContent = newUserInfo.name;
        jobElement.textContent = newUserInfo.about;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
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
