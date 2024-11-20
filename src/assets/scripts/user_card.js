const openProfileCard = document.querySelector(".profile-anchor");
const profileCard = document.querySelector(".profile-dropdown");
const toggleProfilleActive = () => {
  profileCard.classList.toggle("active");
};

openProfileCard.addEventListener("click", () => {
  console.log("foi");
  toggleProfilleActive();
});
