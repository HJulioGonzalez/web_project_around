let editButton = document.querySelector(".author__editbutton");

function showEditInfo() {
  let formWindow = document.querySelector(".popup_opened");
  formWindow.setAttribute("style", "display: flex");
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

let LikeButton = document.querySelectorAll(".venue__info-likebutton");

console.log(LikeButton);

function hoverDownLikeButton() {
  let LikeButtonPath = document.querySelectorAll(
    ".venue__info-likebutton-path"
  );
  LikeButtonPath.style.fill = "rgba(0, 0, 0, 0.5)";
}

LikeButton.forEach(hoverDownLikeButton(btn));

// function hoverUpLikeButton() {
//   let LikeButtonPath = document.querySelector(".venue__info-likebutton-path");
//   LikeButtonPath.style.fill = "rgba(0, 0, 0, 1)";
// }

// function clickingDownLikeButton() {
//   let LikeButtonPath = document.querySelector(".venue__info-likebutton-path");
//   LikeButtonPath.setAttribute("fill-rule", "evenodd");
//   LikeButtonPath.setAttribute("clip-rule", "evenodd");
//   LikeButtonPath.setAttribute(
//     "d",
//     "M19.3764 1.68186C21.5412 3.90213 21.5412 7.54338 19.3764 9.78586L10.4812 19L1.60755 9.80806C0.578719 8.72013 0 7.27695 0 5.74496C0 4.21297 0.557285 2.76979 1.60755 1.68186C3.75096 -0.560619 7.26614 -0.560619 9.43098 1.70406L10.4812 2.792L11.5315 1.68186C13.6964 -0.560619 17.2115 -0.560619 19.3764 1.68186Z"
//   );
// }

// function clickingUpLikeButton() {
//   let LikeButtonPath = document.querySelector(".venue__info-likebutton-path");
//   LikeButtonPath.removeAttribute("fill-rule", "evenodd");
//   LikeButtonPath.removeAttribute("clip-rule", "evenodd");
//   LikeButtonPath.setAttribute(
//     "d",
//     "M19.3764 9.78586C21.5412 7.54338 21.5412 3.90213 19.3764 1.68186C17.2115 -0.560619 13.6964 -0.560619 11.5315 1.68186L10.4812 2.792L9.43098 1.70406C7.26614 -0.560619 3.75096 -0.560619 1.60755 1.68186C0.557285 2.76979 0 4.21297 0 5.74496C0 7.27695 0.578719 8.72013 1.60755 9.80806L10.4812 19L19.3764 9.78586ZM1.37178 5.74496C1.37178 4.59042 1.80046 3.52469 2.59352 2.72539C3.40801 1.88168 4.45828 1.45983 5.50855 1.45983C6.55882 1.45983 7.60909 1.88168 8.42358 2.72539L10.4812 4.83465L12.5389 2.70318C14.1465 1.03798 16.7829 1.03798 18.369 2.70318C19.1406 3.50248 19.5907 4.56821 19.5907 5.72276C19.5907 6.8773 19.162 7.94303 18.369 8.74233L10.4812 16.9351L2.59352 8.76453C1.82189 7.94303 1.37178 6.8773 1.37178 5.74496Z"
//   );
// }

LikeButton.addEventListener("mousemove", hoverDownLikeButton);
// LikeButton.addEventListener("mouseout", hoverUpLikeButton);
// LikeButton.addEventListener("mousedown", clickingDownLikeButton);
// LikeButton.addEventListener("mouseup", clickingUpLikeButton);
