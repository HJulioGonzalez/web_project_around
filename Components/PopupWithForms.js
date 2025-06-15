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
  saveStateSelector,
  savingStateSelector,
} from "../utils/constants.js";
import { PopUp } from "../Components/Popup.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { Api, initialInfo } from "../Components/Api.js";
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

  generateForm() {
    console.log(initialInfo._baseUrl, initialInfo._headers.authorization);
    this._element = this._getTemplate();
    this._newImgForm = this._element.firstElementChild;
    this._saveButon = this._element.querySelector(newPicSaveButtonSelector);
    this._saveButon.textContent = saveStateSelector;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._newImgForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.getNewData();
      this.creatingNewPost();
      this._saveButon.textContent = savingStateSelector;
    });
    this._newImgForm.elements.newImgCloseButton.addEventListener(
      "click",
      (evt) => {
        evt.preventDefault();
        this.close(this._element);
      }
    );
    this._element.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this.close(this._element) : "";
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

  close(element) {
    element.remove();
    element.firstElementChild.reset();
    this._saveButon.textContent = saveStateSelector;
  }

  getNewData() {
    this._newTownInfo = {};
    this._newTownInfo.name = this._newImgForm.elements.name.value;
    this._newTownInfo.link = this._newImgForm.elements.link.value;
  }

  creatingNewPost() {
    fetch(`${initialInfo._baseUrl}/cards`, {
      method: "POST",

      headers: {
        authorization: initialInfo._headers.authorization,
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
        setTimeout(() => {
          this.close(this._element);
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
