const openModalButton = document.querySelectorAll(".open-modal");
const closeModalButton = document.querySelector("#close-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modal-add");
console.log(modal);
const toggleHide = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};
//[closeModalButton, fade]
openModalButton.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleHide();
  });
});

[closeModalButton, fade].forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleHide();
  });
});