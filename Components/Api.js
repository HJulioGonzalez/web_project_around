import Section from "../Components/Section.js";
import {
  cardListSelector,
  cardPicSelector,
  currentUserNameSelector,
  currentUserJobSelector,
  popUpNewImgTemplate,
  newImgAddButton,
  FormRenderer,
  authorInfoEditButton,
  authorPicSelector,
  popUpWithDefaultImage,
} from "../utils/constants.js";
import { Card } from "../Components/Card.js";
import { PopUpWithForms } from "../Components/PopupWithForms.js";
import { UserInfo } from "../Components/UserInfo.js";
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  renderUserInfo(data) {
    const nameElement = document.querySelector(currentUserNameSelector);
    const jobElement = document.querySelector(currentUserJobSelector);
    const picElement = document.querySelector(authorPicSelector);
    nameElement.textContent = data.name;
    jobElement.textContent = data.about;
    picElement.setAttribute("src", data.avatar);
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
      currentUser.formOpened();
      FormRenderer.addItem(userNewInfoForm);
    });
  }

  renderCardsInfo(data) {
    const cardsSection = new Section(
      {
        data: data,
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
    const newImgFormElement = newImgForm.generateForm();
    newImgAddButton.forEach((item) => {
      item.addEventListener("click", (evt) => {
        evt.preventDefault();
        newImgForm.formOpened();
        FormRenderer.addItem(newImgFormElement);
      });
    });
  }
}

export const initialInfo = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "d0312e08-7264-4abf-aaac-0ec85ede7320",
    "Content-Type": "application/json",
  },
});

const linkList = [
  `${initialInfo._baseUrl}/users/me`,
  `${initialInfo._baseUrl}/cards`,
];

const fetchPromises = linkList.map((url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      authorization: initialInfo._headers.authorization,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
});

Promise.all(fetchPromises)
  .then((data) => {
    const userInfo = data[0];
    const cardsInfo = data[1];
    initialInfo.renderUserInfo(userInfo);
    initialInfo.renderCardsInfo(cardsInfo);
  })
  .catch((err) => {
    console.log(`Error: ${err} - ${err.status}`);
    return [];
  });
