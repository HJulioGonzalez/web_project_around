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
  authorInfoEditButton,
  authorPicSelector,
} from "../utils/constants.js";
import { Card } from "../Components/Card.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopUpWithForms } from "../Components/PopupWithForms.js";
import { UserInfo } from "../Components/UserInfo.js";
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
              const cardElement = card.generateCard();
              cardsSection.addItem(cardElement);
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
            newImgForm.formOpened();
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
      .then((userInfo) => {
        const nameElement = document.querySelector(currentUserNameSelector);
        const jobElement = document.querySelector(currentUserJobSelector);
        const picElement = document.querySelector(authorPicSelector);
        nameElement.textContent = userInfo.name;
        jobElement.textContent = userInfo.about;
        picElement.setAttribute("src", userInfo.avatar);
        const currentUser = new UserInfo(
          currentUserNameSelector,
          currentUserJobSelector
        );
        const userNewInfoForm = currentUser.generateForm(
          this._baseUrl,
          this._headers.authorization
        );
        authorInfoEditButton.addEventListener("click", (evt) => {
          evt.preventDefault();
          FormRenderer.addItem(userNewInfoForm);
        });
      })
      .catch((err) => {
        console.log(`Error: ${err} - ${err.status}`);
        return [];
      });
  }
  // otros métodos para trabajar con la API
}
