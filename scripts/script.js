let editButton = document.querySelector(".author__editbutton_hovered");

function showEditInfo() {
  let editButton = document.querySelector(".popup_opened");
  editButton.setAttribute("style", "display: flex");
}

editButton.addEventListener("click", showEditInfo);

let closeButton = document.querySelector(".popup__container-closebuttton");

function closeEditForm() {
  let formWindow = document.querySelector(".popup_opened");
  formWindow.setAttribute("style", "display: none");
}

closeButton.addEventListener("click", closeEditForm);

let formElement = document.querySelector(".popup__container");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__container-name");
  let jobInput = document.querySelector(".popup__container-job");

  let newName = nameInput.value;
  let newJob = jobInput.value;

  let currentName = document.querySelector(".author__info-name");
  let currentJob = document.querySelector(".author__info-job");

  currentName.textContent = newName;
  currentJob.textContent = newJob;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", closeEditForm);
