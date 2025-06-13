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
  editPicContainerSelector,
  editInfoSaveButtonSelector,
  editPicSaveButtonSelector,
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
    this._userImg = document.querySelector(authorPicSelector);
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._newInfoForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputList = this._element.querySelectorAll(formInputSelector);
      this.getNewProfileInfo();
    });
    this._newInfoForm.elements.editInfoCloseButton.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        this.close(this._element);
      }
    );
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close(this._element) : null;
    });
    this._userImg.addEventListener("mouseover", () => {
      this.editUserPic();
    });
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
      .then((data) => {
        document.querySelector(editInfoSaveButtonSelector).textContent =
          "Saving...";
        setTimeout(() => {
          nameElement.textContent = data.name;
          jobElement.textContent = data.about;
          this.close(this._element);
        }, 4000);
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }

  editUserPic() {
    this._renderingEditIcon();
    this._editIcon.addEventListener("mouseleave", () => {
      this._editIcon.remove();
    });
    this._setEventListenerNewPic();
  }

  editPicForm() {
    this._editPicSection = new EditUserImg({ popup: editPicFormTemplate });
    this._editPicElement = this._editPicSection.generateForm();
    FormRenderer.addItem(this._editPicElement);
    this._editPicForm = this._editPicElement.querySelector(
      editPicContainerSelector
    );
    this._editPicFormCloseButton =
      this._editPicForm.elements.editPicCloseButton;
  }

  _setEventListenerNewPic() {
    this._editIcon.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.editPicForm();
      this._handleEscClose(this._editPicElement);
      this._editPicForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.setNewUserPic();
      });
      this._editPicFormCloseButton.addEventListener("click", (evt) => {
        this.close(this._editPicElement);
      });
      this._editPicElement.addEventListener("click", (evt) => {
        evt.target === evt.currentTarget
          ? this.close(this._editPicElement)
          : null;
      });
    });
  }

  formOpened() {
    this._handleEscClose(this._element);
  }

  setNewUserPic() {
    this._newUserPicUrl = this._editPicForm.elements.newImgUrl.value;
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headersAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: this._newUserPicUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        document.querySelector(editPicSaveButtonSelector).textContent =
          "Saving...";
        setTimeout(() => {
          this._userImg.setAttribute("src", data.avatar);
          this.close(this._editPicElement);
        }, 4000);
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }

  _renderingEditIcon() {
    this._editIcon = document.createElement("div");
    this._editIcon.classList.add("author__picture-edit-icon");
    const authorSectionElement = document.querySelector(authorSectionSelector);
    authorSectionElement.append(this._editIcon);
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

  close(element) {
    element.remove();
    element.firstElementChild.reset();
  }
}
