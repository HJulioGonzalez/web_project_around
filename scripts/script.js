let editButton = document.querySelector(".author__editbutton");

function showEditInfo() {
  let formWindow = document.querySelector(".edit-info_opened");
  formWindow.setAttribute("style", "display: flex");
}

editButton.addEventListener("click", showEditInfo);

let closeButton = document.querySelector(".edit-info__container-closebuttton");

function closeEditForm() {
  let formWindow = document.querySelector(".edit-info_opened");
  formWindow.setAttribute("style", "display: none");
}

closeButton.addEventListener("click", closeEditForm);

let formElement = document.querySelector(".edit-info__container");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".edit-info__container-name");
  let jobInput = document.querySelector(".edit-info__container-job");

  let newName = nameInput.value;
  let newJob = jobInput.value;

  let currentName = document.querySelector(".author__info-name");
  let currentJob = document.querySelector(".author__info-job");

  currentName.textContent = newName;
  currentJob.textContent = newJob;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", closeEditForm);

let addImageButton = document.querySelector(".author__add-button");

let addImageButton2 = document.querySelector(
  ".author__add-button_resolution_1180"
);

function addNewImgForm() {
  let formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: flex");
}
addImageButton.addEventListener("click", addNewImgForm);
addImageButton2.addEventListener("click", addNewImgForm);

let closeButton2 = document.querySelector(".new-image__container-closebuttton");

function closeNewImgForm() {
  let formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: none");
}

function clearFields() {
  let newImgForm = document.querySelector(".new-image__container");
  newImgForm.reset();
}

closeButton2.addEventListener("click", closeNewImgForm);

let ImgSaveButton = document.querySelector(".new-image__container-button");

function saveNewImg(event) {
  event.preventDefault();
  let formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: none");

  let allImgContanier = document.querySelector(".venues");
  let newImgContainer = document.querySelector(".venue");

  let imgCopy = newImgContainer.cloneNode(true);
  allImgContanier.prepend(imgCopy);

  let imgName = document.querySelector(".new-image__container-town_name");
  let imgURL = document.querySelector(".new-image__container-img_URL");
  let currentImg = document.querySelector(".venue__picture");

  let newImgName = imgName.value;
  let newImgURL = imgURL.value;

  let currentImgName = document.querySelector(".venue__info-name");

  currentImgName.textContent = newImgName;
  currentImg.setAttribute("src", newImgURL);
  currentImg.setAttribute("alt", newImgName);

  let newLikeButtons = document.querySelectorAll(".venue__info-likebutton");

  function likeImage(event) {
    let objClicked = event.target;
    objClicked.setAttribute(
      "style",
      "background: url(../images/like_ACTIVE.svg)"
    );
    console.log(objClicked);
  }

  for (i = 0; i < newLikeButtons.length; i++) {
    newLikeButtons[i].addEventListener("click", likeImage);
  }

  let newDelButtons = document.querySelectorAll(".venue__del-button");

  function delImage(event) {
    let delObjClicked = event.target;
    delObjClicked.parentElement.remove();
  }

  for (i = 0; i < newDelButtons.length; i++) {
    newDelButtons[i].addEventListener("click", delImage);
  }

  let newLikeButton = document.querySelector(".venue__info-likebutton");

  newLikeButton.style.backgroundImage = "url(../images/like_BLACK.svg";

  let newAllImages = document.querySelectorAll(".venue__picture");

  function openNewImage(event) {
    let openedImageForm = document.querySelector(".prompted-image_opened");
    openedImageForm.setAttribute("style", "display: flex");

    let imgObjClicked = event.target;
    let clickImgURL = imgObjClicked.getAttribute("src");
    let clickImgAltTxt = imgObjClicked.getAttribute("alt");

    let promptedImgURL = document.querySelector(
      ".prompted-image__container-picture"
    );
    promptedImgURL.setAttribute("src", clickImgURL);
    promptedImgURL.setAttribute("alt", clickImgAltTxt);
  }

  for (i = 0; i < newAllImages.length; i++) {
    newAllImages[i].addEventListener("click", openNewImage);
  }
}

ImgSaveButton.addEventListener("click", saveNewImg);

function likeImage(event) {
  let LikeObjClicked = event.target;
  LikeObjClicked.setAttribute(
    "style",
    "background: url(../images/like_ACTIVE.svg)"
  );
}

let likeButtons = document.querySelectorAll(".venue__info-likebutton");

for (i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", likeImage);
}

function delImage(event) {
  let delObjClicked = event.target;
  delObjClicked.parentElement.remove();
}

let delButtons = document.querySelectorAll(".venue__del-button");

for (i = 0; i < delButtons.length; i++) {
  delButtons[i].addEventListener("click", delImage);
}

function openImage(event) {
  let openedImageForm = document.querySelector(".prompted-image_opened");
  openedImageForm.setAttribute("style", "display: flex");

  let imgObjClicked = event.target;
  let clickImgURL = imgObjClicked.getAttribute("src");
  let clickImgAltTxt = imgObjClicked.getAttribute("alt");
  let clickImgName =
    imgObjClicked.nextElementSibling.firstElementChild.textContent;

  let clickImgLabel = document.querySelector(
    ".prompted-image__container-label"
  );
  clickImgLabel.textContent = clickImgName;

  let promptedImgURL = document.querySelector(
    ".prompted-image__container-picture"
  );
  promptedImgURL.setAttribute("src", clickImgURL);
  promptedImgURL.setAttribute("alt", clickImgAltTxt);
}

let allImages = document.querySelectorAll(".venue__picture");

for (i = 0; i < allImages.length; i++) {
  allImages[i].addEventListener("click", openImage);
}

function closeImgForm() {
  let ImageForm = document.querySelector(".prompted-image_opened");
  ImageForm.setAttribute("style", "display: none");
}

let promptedImgCloseButton = document.querySelector(
  ".prompted-image__container-closebuttton"
);
promptedImgCloseButton.addEventListener("click", closeImgForm);
