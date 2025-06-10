import {
  likeButtonSelector,
  cardPicSelector,
  townNameSelector,
  cardTemplate,
  allCardsListSelector,
  deleteButtonSelector,
  confirmationFormTemplate,
  FormRenderer,
  delImgConfirmationSelector,
  likeStatusActiveSelector,
  likeStatusInactiveSelector,
} from "../utils/constants.js";
import { PopupWithConfirmation } from "../Components/PopupWithConfirmation.js";
import { Api } from "../Components/Api.js";
export class Card {
  constructor(data) {
    this._townTitle = data.name;
    this._townUrl = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(cardTemplate)
      .content.querySelector(allCardsListSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard(cardId, baseUrl, headersAuthorization, likeStatus) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(likeButtonSelector);
    likeStatus
      ? this._likeButton.setAttribute("src", likeStatusActiveSelector)
      : this._likeButton.setAttribute("src", likeStatusInactiveSelector);
    this.likeButton(cardId, baseUrl, headersAuthorization, likeStatus);
    this.delPicForm(cardId, baseUrl, headersAuthorization);
    this._element.querySelector(cardPicSelector).src = this._townUrl;
    this._element.querySelector(townNameSelector).textContent = this._townTitle;
    return this._element;
  }

  likeRealTime() {
    console.log("cambia el icono");
  }

  likeButton(cardId, baseUrl, headersAuthorization, likeStatus) {
    this._likeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.likeRealTime(likeStatus);
      const method = !likeStatus ? "PUT" : "DELETE";
      fetch(`${baseUrl}/cards/${cardId}/likes`, {
        method: method,
        cache: "no-store",
        headers: {
          authorization: headersAuthorization,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((data) => {
          likeStatus = !likeStatus;
          console.log(data);
        })
        .catch((err) => {
          console.log(`Error: ${err} - ${err.status}`);
        });
    });
  }

  likeRealTime(likeStatus) {
    if (!likeStatus) {
      this._likeButton.setAttribute("src", likeStatusActiveSelector);
      likeStatus = !likeStatus;
    } else {
      this._likeButton.setAttribute("src", likeStatusInactiveSelector);
      likeStatus = !likeStatus;
    }
  }

  delPicForm(cardId, baseUrl, headersAuthorization) {
    const deleteButton = this._element.querySelector(deleteButtonSelector);
    this._confirmSection = new PopupWithConfirmation({
      popup: confirmationFormTemplate,
    });
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log("delete button has been clicked");
      this._confirmElement = this._confirmSection.generateForm();
      FormRenderer.addItem(this._confirmElement);
      this._setEventListeners(cardId, baseUrl, headersAuthorization);
    });
  }

  _setEventListeners(cardId, baseUrl, headersAuthorization) {
    this._confirmForm = this._confirmElement.firstElementChild;
    this._confirmButton = this._confirmForm.elements.confirmationButton;
    this._confirmDelButton = this._confirmForm.elements.popupDeleteCloseButton;
    this._confirmForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirmElement.remove();
      this._element.remove();
      const updatedCardsInfo = new Api({
        baseUrl: "https://around-api.es.tripleten-services.com/v1",
        headers: {
          authorization: "d0312e08-7264-4abf-aaac-0ec85ede7320",
          "Content-Type": "application/json",
        },
      });
      console.log(
        updatedCardsInfo._baseUrl,
        updatedCardsInfo._headers.authorization
      );
      return fetch(`${updatedCardsInfo._baseUrl}/cards`, {
        method: "GET",
        headers: {
          authorization: updatedCardsInfo._headers.authorization,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .then((updatedData) => {
          console.log(updatedData);
        })
        .catch((err) => {
          console.log(`Error: ${err} - ${err.status}`);
        });
      // fetch(`${baseUrl}/cards/${cardId}`, {
      //   method: "DELETE",
      //   cache: "no-store",
      //   headers: {
      //     authorization: headersAuthorization,
      //   },
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     return Promise.reject(`Error: ${res.status}`);
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.log(`${err} - ${err.status}`);
      //   });
    });
    this._confirmDelButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._confirmElement.remove();
    });
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._confirmElement.remove() : "";
    });
    this._confirmElement.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this._confirmElement.remove() : "";
    });
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._confirmElement.remove() : "";
    });
  }

  close() {
    console.log("closing function has been called");
  }
}
