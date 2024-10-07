import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  closeNewImgForm,
  newImgForm,
  newImgNameEle,
  newUrlImgEle,
  saveButtonList,
} from "./utils.js";

import { enableValidationElements } from "./FormValidator.js";

const initialCards = [
  {
    name: "Gold Coast",
    link: "https://viajes.nationalgeographic.com.es/medio/2015/03/23/mg_2819a_1000x871.jpg",
  },
  {
    name: "South Australia",
    link: "https://ausweek.mymedia.delivery/wp-content/uploads/2020/08/155664.jpg",
  },
  {
    name: "Melbourne",
    link: "https://image-tc.galaxy.tf/wijpeg-cvuab0pgtuyszmx6ytsrb8cpx/melbourne-train-station-1_standard.jpg?crop=106%2C0%2C1708%2C1281",
  },
  {
    name: "Opera Sydney",
    link: "https://cdn.britannica.com/85/95085-050-C749819D/Sydney-Opera-House-Bennelong-Point-Port-Jackson.jpg",
  },
  {
    name: "Ayers Rock",
    link: "https://live-production.wcms.abc-cdn.net.au/225a1130c1aa2739bf969f0e17948513?impolicy=wcms_crop_resize&cropH=1688&cropW=3000&xPos=0&yPos=0&width=862&height=485",
  },
  {
    name: "Kangaroo Island",
    link: "https://expatstraveltogether.com/wp-content/uploads/2023/09/stokes-bay-kangaroo-island-credit-south-australian-tourism-commission-1290x540.jpg",
  },
];

(function () {
  newImgForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newImgName = newImgNameEle.value;
    const newImgUrlTxt = newUrlImgEle.value;
    const newCards = [];
    newCards.push({
      name: newImgName,
      link: newImgUrlTxt,
    });
    newCards.forEach((item) => {
      const card = new Card(item.name, item.link);
      const cardElement = card.generateCard();
      document.querySelector(".venues").append(cardElement);
      card._likeFunction();
      card._deleteFunction();
      card._openImage();
    });
    evt.target
      .querySelector(enableValidationElements.submitButtonSelector)
      .setAttribute("disabled", "true");
    evt.target
      .querySelector(enableValidationElements.submitButtonSelector)
      .classList.add(enableValidationElements.inactiveButtonClass);
  });

  saveButtonList.forEach((item) => {
    item.setAttribute("disabled", "true");
    item.classList.add(enableValidationElements.inactiveButtonClass);
  });

  initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();
    document.querySelector(".venues").append(cardElement);
    card._likeFunction();
    card._deleteFunction();
    card._openImage();
  });

  newImgForm.addEventListener("submit", closeNewImgForm);

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
