export class Card {
  constructor(townTitle, townUrl) {
    this._townTitle = townTitle;
    this._townUrl = townUrl;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".venues__template")
      .content.querySelector(".venue")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".venue__picture").src = this._townUrl;
    this._element.querySelector(".venue__info-name").textContent =
      this._townTitle;

    return this._element;
  }

  _likeFunction() {
    const likeButton = this._element.querySelector(".venue__info-likebutton");
    likeButton.addEventListener("click", () => {
      likeButton.setAttribute("src", "./images/like_ACTIVE.png");
    });
  }

  _deleteFunction() {
    const deleteButton = this._element.querySelector(".venue__del-button");
    deleteButton.addEventListener("click", () => {
      deleteButton.parentElement.remove();
    });
  }

  _openImage() {
    const townImageElement = this._element.querySelector(".venue__picture");
    townImageElement.addEventListener("click", () => {
      const openImageFormTemplate = document.querySelector(
        ".prompted-image__template"
      ).content;
      const openImageForm = openImageFormTemplate
        .querySelector(".prompted-image")
        .cloneNode(true);
      document.querySelector(".page").append(openImageForm);
      const openedImage = document.querySelector(
        ".prompted-image__container-picture"
      );
      openedImage.setAttribute("src", townImageElement.getAttribute("src"));
      const openedImageName = document.querySelector(
        ".prompted-image__container-label"
      );
      openedImageName.textContent =
        townImageElement.nextElementSibling.firstElementChild.textContent;
      const openedImgCloseButton = document.querySelector(
        ".prompted-image__container-closebuttton"
      );
      openedImgCloseButton.addEventListener("click", () => {
        document.querySelector(".page").lastElementChild.remove();
      });
    });
  }
}
