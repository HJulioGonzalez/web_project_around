import { Card } from "./Components/Card.js";
import { FormValidator } from "./Components/FormValidator.js";
import { enableValidationElements } from "./Components/FormValidator.js";
import {
  initialCards,
  cardListSelector,
  popUpImgTemplate,
  popUpNewImgTemplate,
  contentSelector,
  newImgAddButton,
  cardPicSelector,
  currentUserJob,
  currentUserName,
  authorInfoEditButton,
} from "./utils/constants.js";
import Section from "./Components/Section.js";
import { PopupWithImage } from "./Components/PopupWithImage.js";
import { PopUpWithForms } from "./Components/PopupWithForms.js";
import { UserInfo } from "./Components/UserInfo.js";

const popUpWithDefaultImage = new PopupWithImage({ popup: popUpImgTemplate });
const defaultCards = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem);
      const cardElement = card.generateCard();
      cardElement
        .querySelector(cardPicSelector)
        .addEventListener("click", (evt) => {
          evt.preventDefault();
          popUpWithDefaultImage.open().close();
          popUpWithDefaultImage._element.firstElementChild.children[1].textContent =
            cardItem.name;
          popUpWithDefaultImage._element.firstElementChild.firstElementChild.setAttribute(
            "src",
            cardItem.link
          );
        });
      defaultCards.addItem(cardElement);
    },
  },
  cardListSelector
);
defaultCards.renderItems();
const newImgForm = new PopUpWithForms({
  popup: popUpNewImgTemplate,
  handleFormSubmit: (formData) => {
    const newCard = new Card(formData);
    const newCardElement = newCard.generateCard();
    newCardElement
      .querySelector(cardPicSelector)
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        popUpWithDefaultImage.open().close();
        popUpWithDefaultImage._element.firstElementChild.children[1].textContent =
          formData.name;
        popUpWithDefaultImage._element.firstElementChild.firstElementChild.setAttribute(
          "src",
          formData.link
        );
      });
    defaultCards.addItem(newCardElement);
  },
});
const newImgFormElement = newImgForm.generateForm();
const FormRenderer = new Section({ data: [] }, contentSelector);
newImgAddButton.forEach((item) => {
  item.addEventListener("click", (evt) => {
    evt.preventDefault();
    FormRenderer.addItem(newImgFormElement);
  });
});
const currentUser = new UserInfo(currentUserName, currentUserJob);
const userNewInfoForm = currentUser.generateForm();
authorInfoEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  FormRenderer.addItem(userNewInfoForm);
});
(function () {
  document.addEventListener("input", (evt) => {
    if (
      evt.target.parentElement.classList.contains(
        enableValidationElements.formSelector.slice(1)
      )
    ) {
      const validator = new FormValidator(enableValidationElements, evt.target);
      validator.enableValidation();
    }
  });
})();
