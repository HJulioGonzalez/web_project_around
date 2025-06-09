import Section from "../Components/Section.js";
import {
  cardListSelector,
  popUpImgTemplate,
  cardPicSelector,
  currentUserNameSelector,
  currentUserJobSelector,
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
      .catch((err) => {
        console.log(err);
        return [];
      });
  }

  deleteCard() {
    return fetch(`${this._baseUrl}/cards/6840f755a533c2001afbd866`, {
      method: "DELETE",
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
        console.log(err);
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
        console.log(err);
        return [];
      });
  }
  // otros métodos para trabajar con la API
}
