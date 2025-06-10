import {
  formInputSelector,
  popUpNewImgSelector,
  contentSelector,
  newImgNameSelector,
  cardListSelector,
  popUpImgTemplate,
  cardPicSelector,
  FormRenderer,
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

  generateForm(baseUrl, headersAuthorization, allCards) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._element = this._getTemplate();
    this._newImgForm = this._element.firstElementChild;
    this._setEventListener(allCards);
    return this._element;
  }

  _setEventListener(allCards) {
    this._newImgForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.getNewData();
      this.creatingNewPost(allCards);
      this.close();
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
    this._handleEscClose();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(formInputSelector);
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.id] = input.value;
    });
    return this._formValues;
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

  renderingCards() {}

  getNewData() {
    this._newTownInfo = {};
    this._newTownInfo.name = this._newImgForm.elements.name.value;
    this._newTownInfo.link = this._newImgForm.elements.link.value;
  }

  creatingNewPost(allCards) {
    const popUpWithDefaultImage = new PopupWithImage({
      popup: popUpImgTemplate,
    });
    const newCardObj = new Card(this._newTownInfo);
    const newCardElement = newCardObj.generateCard();
    const newCardSection = new Section({ data: [] }, cardListSelector);
    newCardSection.addItem(newCardElement);
    newCardElement
      .querySelector(cardPicSelector)
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        popUpWithDefaultImage.open().close();
        popUpWithDefaultImage.setImageData(evt);
      });
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
        console.log(data, allCards);
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }
}
