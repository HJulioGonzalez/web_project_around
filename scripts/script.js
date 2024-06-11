const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const picNames = initialCards.map(function (item) {
  return item.name;
});

const picLinks = initialCards.map(function (item) {
  return item.link;
});

const venueTemplate = document.querySelector(".venues__template").content;
const venuesContainer = document.querySelector(".venues");
const venueContainer = venueTemplate.querySelector(".venue").cloneNode(true);
const likeButton = venueContainer.querySelector(".venue__info-likebutton");
likeButton.setAttribute("src", "./images/like_BLACK.svg");

venuesContainer.append(
  venueContainer,
  venueContainer.cloneNode(true),
  venueContainer.cloneNode(true),
  venueContainer.cloneNode(true),
  venueContainer.cloneNode(true),
  venueContainer.cloneNode(true)
);

const venueNames = document.querySelectorAll(".venue__info-name");
const venueNamesArray = Array.from(venueNames);

const textNames = venueNamesArray.map(function (item, i) {
  return (item.textContent = picNames[i]);
});

const allVenuePic = document.querySelectorAll(".venue__picture");
const allVenuePicArray = Array.from(allVenuePic);

const venuePic = allVenuePicArray.map(function (item, i) {
  return (item.src = picLinks[i]);
});

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
  const newImageFormTemplate = document.querySelector(
    ".new-image__template"
  ).content;
  const entirePage = document.querySelector(".page");
  const newImageForm = newImageFormTemplate
    .querySelector(".new-image")
    .cloneNode(true);

  entirePage.append(newImageForm);

  document.querySelector(".new-image__title").textContent = "New Place";
  document.querySelector(".new-image__container-town-name").placeholder =
    "Town Name";
  document.querySelector(".new-image__container-img-URL").placeholder =
    "Image URL";

  const newImgFormCloseButton = document.querySelector(
    ".new-image__container-closebuttton"
  );

  newImgFormCloseButton.addEventListener("click", function () {
    const listItem = newImgFormCloseButton.closest(".new-image");
    listItem.remove();
  });

  const saveNewImgButton = document.querySelector(
    ".new-image__container-button"
  );

  saveNewImgButton.addEventListener("click", function () {
    const newVenue = document.querySelector(".venue").cloneNode(true);
    venuesContainer.prepend(newVenue);
    const currentNewImgName = document.querySelector(".venue__info-name");
    const newImgNameEle = document.querySelector(
      ".new-image__container-town-name"
    );
    const newImgName = newImgNameEle.value;
    currentNewImgName.textContent = newImgName;
    const newUrlImgEle = document.querySelector(
      ".new-image__container-img-URL"
    );
    const newImgUrlTxt = newUrlImgEle.value;
    const newUrlImg = document.querySelector(".venue__picture");
    newUrlImg.setAttribute("src", newImgUrlTxt);
    const listItem = newImgFormCloseButton.closest(".new-image");
    listItem.remove();

    const allNewLikeButtons = document.querySelectorAll(
      ".venue__info-likebutton"
    );
    const allNewLikeButtonsArray = Array.from(allNewLikeButtons);
    const newLikeButtons = allNewLikeButtonsArray.slice(0, -6);

    newLikeButtons.forEach(function (item) {
      item.addEventListener("click", function (evt) {
        const objClicked = evt.target;
        objClicked.setAttribute("src", "./images/like_ACTIVE.png");
      });
    });

    const allNewDeleteButtons = document.querySelectorAll(".venue__del-button");
    const allNewDeleteButtonsArray = Array.from(allNewDeleteButtons);
    const newDeleteButtons = allNewDeleteButtonsArray.slice(0, -6);

    newDeleteButtons.forEach(function (item) {
      item.addEventListener("click", function (evt) {
        const objClicked = evt.target.parentElement;
        objClicked.remove();
      });
    });
    const updatesVenues = document.querySelectorAll(".venue__picture");

    updatesVenues.forEach(function (item) {
      item.addEventListener("click", openImages);
    });
  });
}
addImageButton.addEventListener("click", addNewImgForm);
addImageButton2.addEventListener("click", addNewImgForm);

const allLikeButtons = document.querySelectorAll(".venue__info-likebutton");

allLikeButtons.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const objClicked = evt.target;
    objClicked.setAttribute("src", "./images/like_ACTIVE.png");
  });
});

const allDeleteButtons = document.querySelectorAll(".venue__del-button");

allDeleteButtons.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const objClicked = evt.target.parentElement;
    objClicked.remove();
  });
});

function openImages(evt) {
  const openImageFormTemplate = document.querySelector(
    ".prompted-image__template"
  ).content;
  const entirePage = document.querySelector(".page");
  const openImageForm = openImageFormTemplate
    .querySelector(".prompted-image")
    .cloneNode(true);

  entirePage.append(openImageForm);
  const imgClicked = evt.target;
  console.log(imgClicked);
  const imgClickedURL = imgClicked.getAttribute("src");
  const openedImage = document.querySelector(
    ".prompted-image__container-picture"
  );
  openedImage.setAttribute("src", imgClickedURL);
  const imgClickedNameObj = imgClicked.nextElementSibling.firstElementChild;
  const imgClickedName = imgClickedNameObj.textContent;
  const openedImageName = document.querySelector(
    ".prompted-image__container-label"
  );
  openedImageName.textContent = imgClickedName;

  function closeOpenedImg() {
    entirePage.lastElementChild.remove();
  }

  const openedImgCloseButton = document.querySelector(
    ".prompted-image__container-closebuttton"
  );
  openedImgCloseButton.addEventListener("click", closeOpenedImg);
}

const allVenues = document.querySelectorAll(".venue__picture");

allVenues.forEach(function (item) {
  item.addEventListener("click", openImages);
});
