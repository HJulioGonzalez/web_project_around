import Section from "../Components/Section.js";
export const initialCards = [
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

export const cardListSelector = ".venues";
export const allCardsListSelector = ".venue";
export const contentSelector = ".content";
export const cardPicSelector = ".venue__picture";
export const townNameSelector = ".venue__info-name";
export const popUpCloseButtonSelector =
  ".prompted-image__container-closebuttton";
export const popUpImgSelector = ".prompted-image__container-picture";
export const newImgFormCloseButtonSelector = ".new-picture-closebuttton";
export const popUpSelector = ".prompted-image";
export const popUpNewImgSelector = ".new-picture";
export const popUpUserInfoSelector = ".edit-info";
export const popUpConfirmationSelector = ".popup-delete";
export const currentUserNameSelector = ".author__info-name";
export const currentUserJobSelector = ".author__info-job";
export const cardTemplate = ".venues__template";
export const popUpImgTemplate = ".prompted-image__template";
export const popUpImgLabelSelector = ".prompted-image__container-label";
export const popUpNewImgTemplate = ".new-picture__template";
export const newInfoFormTemplate = ".edit-info__template";
export const confirmationFormTemplate = ".popup-delete__template";
export const newImgAddButtonSelector = ".author__add-button";
export const newImgNameSelector =
  ".new-picture__container-town-name form__input";
export const newImgAddButton = document.querySelectorAll(".author__add-button");
export const delImgConfirmationSelector = ".popup-delete__container-button";
export const formInputSelector = ".form__input";
export const authorInfoEditButton = document.querySelector(
  ".author__editbutton"
);
export const likeButtonSelector = ".venue__info-likebutton";
export const deleteButtonSelector = ".venue__del-button";
export const enableValidationElements = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};
export const FormRenderer = new Section({ data: [] }, contentSelector);
export const userIdHabib = "d0312e08-7264-4abf-aaac-0ec85ede7320";
export const likeStatusActiveSelector = "./images/like_ACTIVE.png";
export const likeStatusInactiveSelector = "./images/like_BLACK.svg";
