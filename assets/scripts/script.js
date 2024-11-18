const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modal-add");
console.log(modal);
const toggleHide = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleHide();
  });
});

const openProfileCard = document.querySelector(".profile-anchor");
const profileCard = document.querySelector(".profile-dropdown");
const toggleProfilleActive = () => {
  profileCard.classList.toggle("active");
};

openProfileCard.addEventListener("click", () => {
  console.log("foi");
  toggleProfilleActive();
});
