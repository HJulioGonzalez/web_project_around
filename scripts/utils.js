// import { enableValidationElements } from "../Components/FormValidator.js";

// const editButton = document.querySelector(".author__editbutton");

// const showEditInfo = () => {
//   const formWindow = document.querySelector(".edit-info");
//   formWindow.classList.add("edit-info_opened");
// };

// export const saveButtonList = Array.from(
//   document.querySelectorAll(".form__submit")
// );

// const closeInfoButton = document.querySelector(
//   ".edit-info__container-closebuttton"
// );

// const closeEditForm = () => {
//   const formWindow = document.querySelector(".edit-info_opened");
//   formWindow.classList.remove("edit-info_opened");
//   const nameInput = document.querySelector(".edit-info__container-name");
//   const jobInput = document.querySelector(".edit-info__container-job");

//   nameInput.value = "";
//   jobInput.value = "";
// };

// const editInfoForm = document.querySelector(".edit-info__container");

// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   const nameInput = document.querySelector(".edit-info__container-name");
//   const jobInput = document.querySelector(".edit-info__container-job");

//   const newName = nameInput.value;
//   const newJob = jobInput.value;

//   const currentName = document.querySelector(".author__info-name");
//   const currentJob = document.querySelector(".author__info-job");

//   currentName.textContent = newName;
//   currentJob.textContent = newJob;

//   evt.target
//     .querySelector(enableValidationElements.submitButtonSelector)
//     .setAttribute("disabled", "true");
//   evt.target
//     .querySelector(enableValidationElements.submitButtonSelector)
//     .classList.add(enableValidationElements.inactiveButtonClass);
// };

// const addImageButton = document.querySelector(".author__add-button");

// const addImageButton2 = document.querySelector(
//   ".author__add-button_resolution_1180"
// );

// const addNewImgForm = () => {
//   const newImageForm = document.querySelector(".new-picture");
//   newImageForm.classList.add("new-picture_opened");
// };

// const newImgFormCloseButton = document.querySelector(
//   ".new-picture__container-closebuttton"
// );

// export const closeNewImgForm = (e) => {
//   e.preventDefault();
//   const newImageForm = document.querySelector(".new-picture");
//   newImageForm.classList.remove("new-picture_opened");
//   const newImgNameEle = document.querySelector(
//     ".new-picture__container-town-name"
//   );
//   const newUrlImgEle = document.querySelector(
//     ".new-picture__container-img-URL"
//   );
//   newImgNameEle.value = "";
//   newUrlImgEle.value = "";
// };

// export const newImgForm = document.querySelector(".new-picture__container");

// export const newImgNameEle = document.querySelector(
//   ".new-picture__container-town-name"
// );
// export const newUrlImgEle = document.querySelector(
//   ".new-picture__container-img-URL"
// );
// editButton.addEventListener("click", showEditInfo);
// closeInfoButton.addEventListener("click", closeEditForm);
// editInfoForm.addEventListener("submit", handleProfileFormSubmit);
// editInfoForm.addEventListener("submit", closeEditForm);
// addImageButton.addEventListener("click", addNewImgForm);
// addImageButton2.addEventListener("click", addNewImgForm);

// newImgFormCloseButton.addEventListener("click", closeNewImgForm);

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("edit-info")) {
//     const formWindow = document.querySelector(".edit-info_opened");
//     formWindow.classList.remove("edit-info_opened");
//     const nameInput = document.querySelector(".edit-info__container-name");
//     const jobInput = document.querySelector(".edit-info__container-job");

//     nameInput.value = "";
//     jobInput.value = "";
//   } else {
//     if (e.target.classList.contains("new-picture")) {
//       const newImageForm = document.querySelector(".new-picture");
//       newImageForm.classList.remove("new-picture_opened");
//       const newImgNameEle = document.querySelector(
//         ".new-picture__container-town-name"
//       );
//       const newUrlImgEle = document.querySelector(
//         ".new-picture__container-img-URL"
//       );
//       newImgNameEle.value = "";
//       newUrlImgEle.value = "";
//     }
//   }
// });

// document.addEventListener("keydown", (e) => {
//   if (
//     e.key === "Escape" &&
//     document.querySelector(".new-picture").classList.contains("new-picture")
//   ) {
//     const newImageForm = document.querySelector(".new-picture");
//     newImageForm.classList.remove("new-picture_opened");
//     const newImgNameEle = document.querySelector(
//       ".new-picture__container-town-name"
//     );
//     const newUrlImgEle = document.querySelector(
//       ".new-picture__container-img-URL"
//     );
//     newImgNameEle.value = "";
//     newUrlImgEle.value = "";
//   }
// });

// document.addEventListener("keydown", (e) => {
//   if (
//     e.key === "Escape" &&
//     document.querySelector(".edit-info").classList.contains("edit-info")
//   ) {
//     const editInfoWindow = document.querySelector(".edit-info");
//     editInfoWindow.classList.remove("edit-info_opened");
//     const nameInput = document.querySelector(".edit-info__container-name");
//     const jobInput = document.querySelector(".edit-info__container-job");

//     nameInput.value = "";
//     jobInput.value = "";
//   }
// });
