const openModalButton = document.querySelectorAll(".button.edit");
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

[fade].forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleHide();
  });
});
