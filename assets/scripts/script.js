const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#imprevisto-add");
const toggleHide = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, fade].forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggleHide();
  });
});
