import Section from "../Components/Section.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
export const cardListSelector = ".venues";
export const allCardsListSelector = ".venue";
export const authorSectionSelector = ".author";
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
export const editInfoContainerSelector = ".edit-info__container";
export const editInfoSaveButtonSelector = ".edit-info__container-button";
export const editPicContainerSelector = ".edit-pic__container";
export const editPicSaveButtonSelector = ".edit-pic__container-button";
export const editPicFormCloseButtonSelector = ".edit-pic__closebuttton";
export const popUpConfirmationSelector = ".popup-delete";
export const editPicSelector = ".edit-pic";
export const authorPicSelector = ".author__picture";
export const newPicContainerSelector = ".new-picture__container";
export const newPicSaveButtonSelector = ".new-picture__container-button";
export const currentUserNameSelector = ".author__info-name";
export const currentUserJobSelector = ".author__info-job";
export const cardTemplate = ".venues__template";
export const popUpImgTemplate = ".prompted-image__template";
export const popUpImgLabelSelector = ".prompted-image__container-label";
export const popUpNewImgTemplate = ".new-picture__template";
export const newInfoFormTemplate = ".edit-info__template";
export const confirmationFormTemplate = ".popup-delete__template";
export const editPicFormTemplate = ".edit-pic__template";
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
export const FormRenderer = new Section({ data: [] }, cardListSelector);
export const popUpWithDefaultImage = new PopupWithImage({
  popup: popUpImgTemplate,
});
export const userIdHabib = "d0312e08-7264-4abf-aaac-0ec85ede7320";
export const likeStatusActiveSelector = "../images/like_ACTIVE.png";
export const likeStatusInactiveSelector = "../images/like_BLACK.svg";
export const saveStateSelector = "Save";
export const savingStateSelector = "Saving...";
export const deletingStateSelector = "Deleting...";
export const linkedInButtonSelector = ".footer__icon-linkedin";
