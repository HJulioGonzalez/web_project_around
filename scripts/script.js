const editButton = document.querySelector(".author__editbutton");

function showEditInfo() {
  const formWindow = document.querySelector(".edit-info_opened");
  formWindow.setAttribute("style", "display: flex");
}

editButton.addEventListener("click", showEditInfo);

const closeButton = document.querySelector(
  ".edit-info__container-closebuttton"
);

function closeEditForm() {
  const formWindow = document.querySelector(".edit-info_opened");
  formWindow.setAttribute("style", "display: none");
}

closeButton.addEventListener("click", closeEditForm);

const formElement = document.querySelector(".edit-info__container");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".edit-info__container-name");
  const jobInput = document.querySelector(".edit-info__container-job");

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const currentName = document.querySelector(".author__info-name");
  const currentJob = document.querySelector(".author__info-job");

  currentName.textContent = newName;
  currentJob.textContent = newJob;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", closeEditForm);

const addImageButton = document.querySelector(".author__add-button");

const addImageButton2 = document.querySelector(
  ".author__add-button_resolution_1180"
);

function addNewImgForm() {
  const formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: flex");
}
addImageButton.addEventListener("click", addNewImgForm);
addImageButton2.addEventListener("click", addNewImgForm);

const closeButton2 = document.querySelector(
  ".new-image__container-closebuttton"
);

function closeNewImgForm() {
  const formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: none");
}

function clearFields() {
  const newImgForm = document.querySelector(".new-image__container");
  newImgForm.reset();
}

closeButton2.addEventListener("click", closeNewImgForm);

const ImgSaveButton = document.querySelector(".new-image__container-button");

function saveNewImg(event) {
  event.preventDefault();
  const formWindow = document.querySelector(".new-image_opened");
  formWindow.setAttribute("style", "display: none");

  const allImgContanier = document.querySelector(".venues");
  const newImgContainer = document.querySelector(".venue");

  const imgCopy = newImgContainer.cloneNode(true);
  allImgContanier.prepend(imgCopy);

  const imgName = document.querySelector(".new-image__container-town-name");
  const imgURL = document.querySelector(".new-image__container-img-URL");
  const currentImg = document.querySelector(".venue__picture");

  const newImgName = imgName.value;
  const newImgURL = imgURL.value;

  const currentImgName = document.querySelector(".venue__info-name");

  currentImgName.textContent = newImgName;
  currentImg.setAttribute("src", newImgURL);
  currentImg.setAttribute("alt", newImgName);

  const newLikeButtons = document.querySelectorAll(".venue__info-likebutton");

  function likeImage(event) {
    const objClicked = event.target;
    objClicked.setAttribute(
      "style",
      "background: url(./images/like-filled.svg)"
    );
  }

  for (i = 0; i < newLikeButtons.length; i++) {
    newLikeButtons[i].addEventListener("click", likeImage);
  }

  const newDelButtons = document.querySelectorAll(".venue__del-button");

  function delImage(event) {
    const delObjClicked = event.target;
    delObjClicked.parentElement.remove();
  }

  for (i = 0; i < newDelButtons.length; i++) {
    newDelButtons[i].addEventListener("click", delImage);
  }

  const newLikeButton = document.querySelector(".venue__info-likebutton");

  newLikeButton.style.backgroundImage = "url(../images/like_BLACK.svg";

  const newAllImages = document.querySelectorAll(".venue__picture");

  function openNewImage(event) {
    const openedImageForm = document.querySelector(".prompted-image_opened");
    openedImageForm.setAttribute("style", "display: flex");

    const imgObjClicked = event.target;
    const clickImgURL = imgObjClicked.getAttribute("src");
    const clickImgAltTxt = imgObjClicked.getAttribute("alt");
    const clickImgName =
      imgObjClicked.nextElementSibling.firstElementChild.textContent;

    const clickImgLabel = document.querySelector(
      ".prompted-image__container-label"
    );
    clickImgLabel.textContent = clickImgName;

    const promptedImgURL = document.querySelector(
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
  const LikeObjClicked = event.target;
  LikeObjClicked.setAttribute(
    "style",
    "background: url(./images/like-filled.svg)"
  );
}

const likeButtons = document.querySelectorAll(".venue__info-likebutton");

for (i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", likeImage);
}

function delImage(event) {
  const delObjClicked = event.target;
  delObjClicked.parentElement.remove();
}

const delButtons = document.querySelectorAll(".venue__del-button");

for (i = 0; i < delButtons.length; i++) {
  delButtons[i].addEventListener("click", delImage);
}

function openImage(event) {
  const openedImageForm = document.querySelector(".prompted-image_opened");
  openedImageForm.setAttribute("style", "display: flex");

  const imgObjClicked = event.target;
  const clickImgURL = imgObjClicked.getAttribute("src");
  const clickImgAltTxt = imgObjClicked.getAttribute("alt");
  const clickImgName =
    imgObjClicked.nextElementSibling.firstElementChild.textContent;

  const clickImgLabel = document.querySelector(
    ".prompted-image__container-label"
  );
  clickImgLabel.textContent = clickImgName;

  const promptedImgURL = document.querySelector(
    ".prompted-image__container-picture"
  );
  promptedImgURL.setAttribute("src", clickImgURL);
  promptedImgURL.setAttribute("alt", clickImgAltTxt);
}

const allImages = document.querySelectorAll(".venue__picture");

for (i = 0; i < allImages.length; i++) {
  allImages[i].addEventListener("click", openImage);
}

function closeImgForm() {
  const ImageForm = document.querySelector(".prompted-image_opened");
  ImageForm.setAttribute("style", "display: none");
}

const promptedImgCloseButton = document.querySelector(
  ".prompted-image__container-closebuttton"
);
promptedImgCloseButton.addEventListener("click", closeImgForm);
