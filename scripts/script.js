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
  const formWindow = document.querySelector(".edit-info");
  formWindow.classList.add("edit-info_opened");
}

editButton.addEventListener("click", showEditInfo);

const closeButton = document.querySelector(
  ".edit-info__container-closebuttton"
);

function closeEditForm() {
  const formWindow = document.querySelector(".edit-info_opened");
  formWindow.classList.remove("edit-info_opened");
  const nameInput = document.querySelector(".edit-info__container-name");
  const jobInput = document.querySelector(".edit-info__container-job");

  nameInput.value = "";
  jobInput.value = "";
}

const editInfoWindow = document.querySelector(".edit-info");

closeButton.addEventListener("click", closeEditForm);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-info")) {
    const formWindow = document.querySelector(".edit-info_opened");
    formWindow.classList.remove("edit-info_opened");
    const nameInput = document.querySelector(".edit-info__container-name");
    const jobInput = document.querySelector(".edit-info__container-job");

    nameInput.value = "";
    jobInput.value = "";
  } else {
    if (e.target.classList.contains("new-picture")) {
      const newImageForm = document.querySelector(".new-picture");
      newImageForm.classList.remove("new-picture_opened");
      const newImgNameEle = document.querySelector(
        ".new-picture__container-town-name"
      );
      const newUrlImgEle = document.querySelector(
        ".new-picture__container-img-URL"
      );
      newImgNameEle.value = "";
      newUrlImgEle.value = "";
    }
  }
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.querySelector(".new-picture").classList.contains("new-picture")
  ) {
    const newImageForm = document.querySelector(".new-picture");
    newImageForm.classList.remove("new-picture_opened");
    const newImgNameEle = document.querySelector(
      ".new-picture__container-town-name"
    );
    const newUrlImgEle = document.querySelector(
      ".new-picture__container-img-URL"
    );
    newImgNameEle.value = "";
    newUrlImgEle.value = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.querySelector(".edit-info").classList.contains("edit-info")
  ) {
    const editInfoWindow = document.querySelector(".edit-info");
    editInfoWindow.classList.remove("edit-info_opened");
    const nameInput = document.querySelector(".edit-info__container-name");
    const jobInput = document.querySelector(".edit-info__container-job");

    nameInput.value = "";
    jobInput.value = "";
  }
});

const editInfoForm = document.querySelector(".edit-info__container");

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

  const editSaveInfoButton = document.querySelector(".form__submit");
}

editInfoForm.addEventListener("submit", handleProfileFormSubmit);
editInfoForm.addEventListener("submit", closeEditForm);

const addImageButton = document.querySelector(".author__add-button");

const addImageButton2 = document.querySelector(
  ".author__add-button_resolution_1180"
);

function addNewImgForm() {
  const newImageForm = document.querySelector(".new-picture");
  newImageForm.classList.add("new-picture_opened");
}

addImageButton.addEventListener("click", addNewImgForm);
addImageButton2.addEventListener("click", addNewImgForm);

const saveNewImgButton = document.querySelector(
  ".new-picture__container-button"
);

function saveNewImg() {
  const newVenue = document.querySelector(".venue").cloneNode(true);
  venuesContainer.prepend(newVenue);
  const currentNewImgName = document.querySelector(".venue__info-name");
  const newImgNameEle = document.querySelector(
    ".new-picture__container-town-name"
  );
  const newImgName = newImgNameEle.value;
  currentNewImgName.textContent = newImgName;
  const newUrlImgEle = document.querySelector(
    ".new-picture__container-img-URL"
  );
  const newImgUrlTxt = newUrlImgEle.value;
  const newUrlImg = document.querySelector(".venue__picture");
  newUrlImg.setAttribute("src", newImgUrlTxt);

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
}

const newImgFormCloseButton = document.querySelector(
  ".new-picture__container-closebuttton"
);

function closeNewImgForm() {
  const newImageForm = document.querySelector(".new-picture");
  newImageForm.classList.remove("new-picture_opened");
  const newImgNameEle = document.querySelector(
    ".new-picture__container-town-name"
  );
  const newUrlImgEle = document.querySelector(
    ".new-picture__container-img-URL"
  );
  newImgNameEle.value = "";
  newUrlImgEle.value = "";
}

const newImgWindow = document.querySelector(".new-picture");

newImgFormCloseButton.addEventListener("click", closeNewImgForm);

const newImgForm = document.querySelector(".new-picture__container");

newImgForm.addEventListener("submit", saveNewImg);
newImgForm.addEventListener("submit", closeNewImgForm);

const allLikeButtons = document.querySelectorAll(".venue__info-likebutton");

allLikeButtons.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const objClicked = evt.target;
    objClicked.setAttribute("src", "./images/like_ACTIVE.png");
    console.log(objClicked);
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
