import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setBtnText } from "../utils/helpers.js";

import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import pencil from "../images/pencil.svg";
import plus from "../images/plus.svg";
import favicon from "../images/favicon.ico";
import Api from "../utils/Api.js";
import pencilLight from "../images/pencil-light.svg";
import closeWhiteIcon from "../images/close-white-icon.svg";

const link =
  document.querySelector("link[rel~='icon']") || document.createElement("link");

link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);

document.querySelector(".header__logo").src = logo;
document.querySelector(".profile__avatar").src = avatar;
document.querySelector(".profile__edit-btn img").src = pencil;
document.querySelector(".profile__add-btn-img").src = plus;
document.querySelector(".profile__pencil-icon").src = pencilLight;

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "686618b0-d798-4a93-9160-cb13652c4430",
    "Content-Type": "application/json",
  },
});

// Edit profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// New post elements
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostFormBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostCardImageInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

// Profile name and description elements
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

// Avatar form elements
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCancelBtn = deleteModal.querySelector(".modal__btn-cancel");

const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
deleteModalCloseBtn.style.backgroundImage = `url(${closeWhiteIcon})`;
deleteModalCloseBtn.style.backgroundColor = "transparent";

if (deleteCancelBtn) {
  deleteCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });
}

// Preview modal and close
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewImageCaption = previewModal.querySelector(".modal__caption");

// Card elements
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

// Delete handlers
function handleDeleteCard(cardElement, cardData) {
  selectedCard = cardElement;
  selectedCardId = cardData._id;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true);

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = null;
      selectedCardId = null;
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
}

// Like handler
function handleLike(evt, cardData) {
  const likeBtn = evt.target;
  const isCurrentlyLiked = cardData.isLiked;

  api
    .changeLikeStatus(cardData._id, isCurrentlyLiked)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        likeBtn.classList.add("card__like-btn_active");
      } else {
        likeBtn.classList.remove("card__like-btn_active");
      }
      cardData.isLiked = updatedCard.isLiked;
      cardData.likes = updatedCard.likes;
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }
  // Like click
  cardLikeBtnEl.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  // Delete click
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  // Preview click
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewImageCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  function evtEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  }

  function evtOverlayClose(evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  }
  document.addEventListener("keydown", evtEscClose);
  modal.addEventListener("mousedown", evtOverlayClose);

  modal._evtEscClose = evtEscClose;
  modal._evtOverlayClose = evtOverlayClose;
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", modal._evtEscClose);
  modal.removeEventListener("mousedown", modal._evtOverlayClose);
}

// Forms
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;

  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

const closeBtns = document.querySelectorAll(".modal__close-btn");

closeBtns.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

newPostBtn.addEventListener("click", function () {
  resetValidation(newPostForm, settings);
  openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
  resetValidation(avatarForm, settings);
  openModal(avatarModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Edit Profile
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// New Post
function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true);

  const newCardData = {
    name: newPostCaptionInput.value,
    link: newPostCardImageInput.value,
  };

  api
    .addCard(newCardData)
    .then((cardDataFromServer) => {
      const cardElement = getCardElement(cardDataFromServer);
      cardsList.prepend(cardElement);
      evt.target.reset();
      disableButton(newPostFormBtn, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
}

// Edit Avatar
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setBtnText(submitBtn, true);

  const avatarLink = avatarInput.value;

  api
    .editAvatarInfo(avatarLink)
    .then((data) => {
      profileAvatarEl.src = data.avatar;

      avatarForm.reset();
      disableButton(avatarSubmitBtn, settings);

      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(submitBtn, false);
    });
}

avatarForm.addEventListener("submit", handleAvatarSubmit);
newPostForm.addEventListener("submit", handleNewPostSubmit);

enableValidation(settings);
