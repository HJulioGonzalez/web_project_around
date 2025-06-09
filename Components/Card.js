import {
  likeButtonSelector,
  cardPicSelector,
  townNameSelector,
  cardTemplate,
  allCardsListSelector,
  deleteButtonSelector,
  confirmationFormTemplate, 
  FormRenderer,
  delImgConfirmationSelector
} from "../utils/constants.js";
import { PopupWithConfirmation } from "../Components/PopupWithConfirmation.js";
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
    this.likeButton(cardId, baseUrl, headersAuthorization, likeStatus);
    this.delPicForm(cardId, baseUrl, headersAuthorization);
    this._element.querySelector(cardPicSelector).src = this._townUrl;
    this._element.querySelector(townNameSelector).textContent = this._townTitle;
    return this._element;
  }

  likeRealTime(){
    console.log("cambia el icono")
  }

  likeButton(cardId, baseUrl, headersAuthorization, likeStatus) {
    this._likeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      likeRealTime();
      const method = !likeStatus? "PUT" : "DELETE";
         fetch(`${baseUrl}/cards/${cardId}/likes`, {
            method: method,
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
            .then(data =>{
              likeStatus = !likeStatus;
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
      // const number = likeClicks++;
      // number % 2 === 0
      //   ? likeButton.setAttribute("src", "./images/like_ACTIVE.png")
      //   : likeButton.setAttribute("src", "./images/like_BLACK.svg");
    });
    function likeRealTime(params) {
     console.log("change icon") 
    }
  }


  delPicForm(cardId, baseUrl, headersAuthorization) {
    const deleteButton = this._element.querySelector(deleteButtonSelector);
    this._confirmSection = new PopupWithConfirmation({ popup: confirmationFormTemplate});
    deleteButton.addEventListener("click", evt=>{
      evt.preventDefault();
      console.log("delete button has been clicked");
    this._confirmElement = this._confirmSection.generateForm();
    FormRenderer.addItem(this._confirmElement);
    this._setEventListeners(cardId, baseUrl, headersAuthorization);
    });
  }

  _setEventListeners(cardId, baseUrl, headersAuthorization){
    this._confirmForm = this._confirmElement.firstElementChild; 
    this._confirmButton = this._confirmForm.elements.confirmationButton;
    this._confirmDelButton = this._confirmForm.elements.popupDeleteCloseButton;
    this._confirmForm.addEventListener("submit", (evt)=>{
      evt.preventDefault();
      this._confirmElement.remove();
      this._element.remove();
      fetch(`${baseUrl}/cards/${cardId}`, {
      method: "DELETE",
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
      .then(data => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    });
    this._confirmDelButton.addEventListener("click", evt=>{
      evt.preventDefault();
      this._confirmElement.remove();
    })
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._confirmElement.remove() : "";
    });
    this._confirmElement.addEventListener("click", evt=>{
      evt.target === evt.currentTarget ? this._confirmElement.remove() : "";
    })
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      evt.key === "Escape" ? this._confirmElement.remove() : "";
    });
  }

  close(){
    console.log("closing function has been called")
  }

}
