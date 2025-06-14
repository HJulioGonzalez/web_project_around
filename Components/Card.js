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
import { Api, initialInfo } from "../Components/Api.js";
export class Card {
  constructor(data) {
    this._townTitle = data.name;
    this._townUrl = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
  }

  updateApi() {
    const updatedCardsInfo = new Api({
      baseUrl: "https://around-api.es.tripleten-services.com/v1",
      headers: {
        authorization: "d0312e08-7264-4abf-aaac-0ec85ede7320",
        "Content-Type": "application/json",
      },
    });
    this._baseUrl = updatedCardsInfo._baseUrl;
    this._authorization = updatedCardsInfo._headers.authorization;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(cardTemplate)
      .content.querySelector(allCardsListSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._updatedCardsInfo = new Api({
      baseUrl: "https://around-api.es.tripleten-services.com/v1",
      headers: {
        authorization: "d0312e08-7264-4abf-aaac-0ec85ede7320",
        "Content-Type": "application/json",
      },
    });
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(likeButtonSelector);
    this._deleteButton = this._element.querySelector(deleteButtonSelector);
    this.likeButton();
    this.delPicForm();
    this._element.querySelector(cardPicSelector).src = this._townUrl;
    this._element.querySelector(townNameSelector).textContent = this._townTitle;
    this._isLiked
      ? (this._element.querySelector(likeButtonSelector).src =
          likeStatusActiveSelector)
      : (this._element.querySelector(likeButtonSelector).src =
          likeStatusInactiveSelector);
    return this._element;
  }

  likeButton() {
    this._likeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.likeRealTime(evt);
      const method = this._isLiked ? "PUT" : "DELETE";
      fetch(`${initialInfo._baseUrl}/cards/${this._id}/likes`, {
        method: method,
        headers: {
          authorization: initialInfo._headers.authorization,
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
    });
  }

  likeRealTime(evt) {
    if (this._isLiked) {
      this._isLiked = !this._isLiked;
      evt.target.setAttribute("src", likeStatusInactiveSelector);
      // likeStatus = !likeStatus;
    } else {
      this._isLiked = !this._isLiked;
      evt.target.setAttribute("src", likeStatusActiveSelector);
      // this._likeButton.setAttribute("src", likeStatusInactiveSelector);
      // likeStatus = !likeStatus;
    }
  }

  delPicForm() {
    this._deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._confirmSection = new PopupWithConfirmation({
        popup: confirmationFormTemplate,
      });
      this._confirmElement = this._confirmSection.generateForm();
      FormRenderer.addItem(this._confirmElement);
      this._setEventListeners(evt.target);
    });
  }

  _setEventListeners(delButton) {
    this._confirmForm = this._confirmElement.firstElementChild;
    this._confirmButton = this._confirmForm.elements.confirmationButton;
    this._confirmDelButton = this._confirmForm.elements.popupDeleteCloseButton;
    this._confirmForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // this._confirmElement.remove();
      // this._element.remove();
      // fetch(`${this._updatedCardsInfo._baseUrl}/cards`, {
      //   method: "GET",
      //   headers: {
      //     authorization: this._updatedCardsInfo._headers.authorization,
      //   },
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     return Promise.reject(`Error: ${res.status}`);
      //   })
      //   .then((updatedData) => {
      //     const cardItem = delButton.closest(allCardsListSelector);
      //     const cardItemName =
      //       cardItem.querySelector(townNameSelector).textContent;
      //     const newCardItemApi = updatedData.find(
      //       (item) => item.name === cardItemName
      //     );
      //     return newCardItemApi._id;
      //   })
      //   .then((data) => {
      //     fetch(`${this._updatedCardsInfo._baseUrl}/cards/${data}`, {
      //       method: "DELETE",
      //       cache: "no-store",
      //       headers: {
      //         authorization: this._updatedCardsInfo._headers.authorization,
      //       },
      //     }).then((res) => {
      //       if (res.ok) {
      //         return res.json();
      //       }
      //       return Promise.reject(`Error: ${res.status}`);
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(`Error: ${err} - ${err.status}`);
      //   });
      fetch(`${initialInfo._baseUrl}/cards/${this._id}`, {
        method: "DELETE",
        headers: {
          authorization: initialInfo._headers.authorization,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        }).then(data=>{
          console.log(data)
        })
        .catch((err) => {
          console.log(`Error: ${err} - ${err.status}`);
          return [];
        });
    });
    this._confirmDelButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._confirmElement.remove();
    });
    // document.addEventListener("keydown", (evt) => {
    //   evt.key === "Escape" ? this._confirmElement.remove() : "";
    // });
    this._confirmElement.addEventListener("click", (evt) => {
      evt.target === evt.currentTarget ? this._confirmElement.remove() : "";
    });
  }
}
