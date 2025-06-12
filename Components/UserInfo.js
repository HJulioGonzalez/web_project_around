import {
  formInputSelector,
  popUpUserInfoSelector,
  currentUserNameSelector,
  currentUserJobSelector,
  FormRenderer,
  newInfoFormTemplate,
  editInfoContainerSelector,
  authorPicSelector,
  authorSectionSelector,
  editPicFormTemplate,
  editPicContainerSelector
} from "../utils/constants.js";
import { Api } from "../Components/Api.js";
import { EditUserImg } from "./EditUserImg.js";
export class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  _getTemplate() {
    const newUserInfoTemplate = document
      .querySelector(newInfoFormTemplate)
      .content.querySelector(popUpUserInfoSelector)
      .cloneNode(true);
    return newUserInfoTemplate;
  }

  generateForm(baseUrl, headersAuthorization) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._element = this._getTemplate();
    this._newInfoForm = this._element.querySelector(editInfoContainerSelector);
    this._setEventListener();
    this.setNewUserPic();
    return this._element;
  }

  _setEventListener() {
    this._newInfoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputList = this._element.querySelectorAll(formInputSelector);
      this.getNewProfileInfo();
      this.close(this._element);
    });
    this._newInfoForm.elements.editInfoCloseButton.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        this.close(this._element);
      }
    );
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close(this._element) : "";
    });
    this._handleEscClose(this._element);
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
    const nameElement = document.querySelector(currentUserNameSelector);
    const jobElement = document.querySelector(currentUserJobSelector);
    nameElement.textContent = this._newProfileInfo.name;
    jobElement.textContent = this._newProfileInfo.about;
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
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }

  setNewUserPic() {
    console.log("setting new image method has been called");
    this._userImg = document.querySelector(authorPicSelector);
    this._setEventListenerNewPic();
  }

  _setEventListenerNewPic() {
    this._userImg.addEventListener("mouseover", () => {
      console.log("you are passing over the user profile picture");
      this._editIcon = document.createElement("div");
      this._editIcon.classList.add("author__picture-edit-icon");
      const authorSectionElement = document.querySelector(
        authorSectionSelector
      );
      authorSectionElement.append(this._editIcon);
      this._editIcon.addEventListener("click", (evt) => {
        evt.preventDefault();
        this._editPicSection = new EditUserImg({ popup: editPicFormTemplate });
        this._editPicElement = this._editPicSection.generateForm();
        FormRenderer.addItem(this._editPicElement);
        this._editPicForm = this._editPicElement.querySelector(editPicContainerSelector);
        this._editPicFormCloseButton = this._editPicForm.elements.editPicCloseButton;
        this._editPicFormCloseButton.addEventListener("click", evt=>{
          console.log("close button has been clicked")
        })
      });

      this._editIcon.addEventListener("mouseleave", () => {
        this._editIcon.remove();
      });
    });
  }

  _handleEscClose(element) {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? element.remove() : "";
    });
  }

  close(element) {
    console.log("close with parameters")
    element.remove();
    element.firstElementChild.reset();
  }
}
