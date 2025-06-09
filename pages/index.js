import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import { enableValidationElements } from "../Components/FormValidator.js";
import {
  initialCards,
  cardListSelector,
  popUpImgTemplate,
  popUpNewImgTemplate,
  contentSelector,
  newImgAddButton,
  cardPicSelector,
  currentUserJobSelector,
  currentUserNameSelector,
  authorInfoEditButton,
  FormRenderer,
} from "../utils/constants.js";
import Section from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopUpWithForms } from "../Components/PopupWithForms.js";
import { UserInfo } from "../Components/UserInfo.js";
import { Api } from "../Components/Api.js";
const initialCardInfo = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "d0312e08-7264-4abf-aaac-0ec85ede7320",
    "Content-Type": "application/json",
  },
});
(function formValidation() {
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
// initialCardInfo.deleteCard();
// const FormRenderer = new Section({ data: [] }, contentSelector);
initialCardInfo.getInitialCards().then((cardsData) => {
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
          cardItem.isLiked,
          initialCardInfo._baseUrl,
          initialCardInfo._headers.authorization,
          cardsData
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
    initialCardInfo._baseUrl,
    initialCardInfo._headers.authorization
  );
  newImgAddButton.forEach((item) => {
    item.addEventListener("click", (evt) => {
      evt.preventDefault();
      FormRenderer.addItem(newImgFormElement);
    });
  });
});
initialCardInfo.getInitialProfileInfo().then((userInfo) => {
  const nameElement = document.querySelector(currentUserNameSelector);
  const jobElement = document.querySelector(currentUserJobSelector);
  nameElement.textContent = userInfo.name;
  jobElement.textContent = userInfo.about;
  const currentUser = new UserInfo(
    currentUserNameSelector,
    currentUserJobSelector
  );
  const userNewInfoForm = currentUser.generateForm(
    initialCardInfo._baseUrl,
    initialCardInfo._headers.authorization
  );
  authorInfoEditButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    FormRenderer.addItem(userNewInfoForm);
  });
});
