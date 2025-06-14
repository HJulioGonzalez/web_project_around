import {
  formInputSelector,
  popUpNewImgSelector,
  newPicSaveButtonSelector,
  contentSelector,
  newImgNameSelector,
  cardListSelector,
  popUpImgTemplate,
  cardPicSelector,
  FormRenderer,
  saveStateSelector, savingStateSelector
} from "../utils/constants.js";
import { PopUp } from "../Components/Popup.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { Api } from "../Components/Api.js";
import { Card } from "../Components/Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "../Components/Section.js";
export class PopUpWithForms extends PopUp {
  constructor({ popup }) {
    super({ popup });
  }

  _getTemplate() {
    const popUpElement = this._popup.content
      .querySelector(popUpNewImgSelector)
      .cloneNode(true);
    return popUpElement;
  }

  generateForm(baseUrl, headersAuthorization) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._element = this._getTemplate();
    this._newImgForm = this._element.firstElementChild;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._newImgForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.getNewData();
      this.creatingNewPost();
    });
    this._newImgForm.elements.newImgCloseButton.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        this.close();
      }
    );
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close() : "";
    });
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(formInputSelector);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
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

  formOpened() {
    this._handleEscClose(this._element);
  }

  close() {
    this._element.remove();
    this._element.firstElementChild.reset();
  }

  getNewData() {
    this._newTownInfo = {};
    this._newTownInfo.name = this._newImgForm.elements.name.value;
    this._newTownInfo.link = this._newImgForm.elements.link.value;
  }

  creatingNewPost() {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",

      headers: {
        authorization: this._headersAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._newTownInfo.name,
        link: this._newTownInfo.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        document.querySelector(newPicSaveButtonSelector).textContent =
          "Saving...";
        setTimeout(() => {
          this.close();
          const newCardObj = new Card(data);
          const newCardElement = newCardObj.generateCard();
          FormRenderer.addItemDefault(newCardElement);
        }, 4000);
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }
}
