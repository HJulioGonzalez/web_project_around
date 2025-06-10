import Section from "../Components/Section.js";
import {
  cardListSelector,
  popUpImgTemplate,
  cardPicSelector,
  currentUserNameSelector,
  currentUserJobSelector,
  popUpNewImgTemplate,
  newImgAddButton,
  FormRenderer,
} from "../utils/constants.js";
import { Card } from "../Components/Card.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopUpWithForms } from "../Components/PopupWithForms.js";
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cardsData) => {
        console.log(cardsData);
        const popUpWithDefaultImage = new PopupWithImage({
          popup: popUpImgTemplate,
        });
        const cardsSection = new Section(
          {
            data: cardsData,
            renderer: (cardItem) => {
              const card = new Card(cardItem);
              const cardElement = card.generateCard(
                cardItem._id,
                this._baseUrl,
                this._headers.authorization,
                cardItem.isLiked
              );
              cardsSection.addItemDefault(cardElement);
              cardElement
                .querySelector(cardPicSelector)
                .addEventListener("click", (evt) => {
                  evt.preventDefault();
                  popUpWithDefaultImage.open().close();
                  popUpWithDefaultImage.setImageData(evt);
                });
            },
          },
          cardListSelector
        );
        cardsSection.renderItems();
        const newImgForm = new PopUpWithForms({ popup: popUpNewImgTemplate });
        const newImgFormElement = newImgForm.generateForm(
          this._baseUrl,
          this._headers.authorization,
          cardsData
        );
        newImgAddButton.forEach((item) => {
          item.addEventListener("click", (evt) => {
            evt.preventDefault();
            FormRenderer.addItem(newImgFormElement);
          });
        });
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }

  getInitialProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._headers.authorization}`,
      },
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
  // otros métodos para trabajar con la API
}
