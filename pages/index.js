import { Card } from "../Components/Card.js";
import { FormValidator } from "../Components/FormValidator.js";
import { enableValidationElements } from "../Components/FormValidator.js";
import {
  initialCards,
  cardListSelector,
  popUpImgTemplate,
  popUpNewImgTemplate,
  confirmationFormTemplate,
  contentSelector,
  newImgAddButton,
  cardPicSelector,
  currentUserJobSelector,
  currentUserNameSelector,
  authorInfoEditButton,
  FormRenderer, userIdHabib
} from "../utils/constants.js";
import Section from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { PopUpWithForms } from "../Components/PopupWithForms.js";
import { PopupWithConfirmation } from "../Components/PopupWithConfirmation.js";
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
initialCardInfo.getInitialCards();
initialCardInfo.getInitialProfileInfo().then((userInfo) => {
  console.log(userInfo)
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
