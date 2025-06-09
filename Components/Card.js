import {
  likeButtonSelector,
  cardPicSelector,
  townNameSelector,
  cardTemplate,
  allCardsListSelector,
  deleteButtonSelector,
} from "../utils/constants.js";
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

  likeButton(likeMode, baseUrl, headersAuthorization, cardsData) {
    const likeButton = this._element.querySelector(likeButtonSelector);
    var likeClicks = 0;
    likeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log(
        "like button has been clicked",
        likeMode,
        baseUrl,
        headersAuthorization,
        cardsData
      );
      // const number = likeClicks++;
      // number % 2 === 0
      //   ? likeButton.setAttribute("src", "./images/like_ACTIVE.png")
      //   : likeButton.setAttribute("src", "./images/like_BLACK.svg");
    });
  }

  _deletePicture() {
    const deleteButton = this._element.querySelector(deleteButtonSelector);
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteButton.parentElement.remove();
    });
  }

  generateCard(likeMode, baseUrl, headersAuthorization) {
    this._element = this._getTemplate();
    this.likeButton(likeMode, baseUrl, headersAuthorization);
    this._deletePicture();
    this._element.querySelector(cardPicSelector).src = this._townUrl;
    this._element.querySelector(townNameSelector).textContent = this._townTitle;
    return this._element;
  }
}
