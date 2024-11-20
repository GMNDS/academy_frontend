const optionsLogin = document.querySelector(".login-options");
// const optionLogin = document.querySelector(".login-option-link.login");
// const optionLoginFirst = document.querySelector(".login-option-link.first");

const toggleOptions = (event) => {
  const target = event.target;
  if (target.classList.contains("login-option-link")) {
    document.querySelectorAll(".login-option-link").forEach((element) => {
      element.classList.remove("option-active");
    });
    target.classList.toggle("option-active");
  }
};

optionsLogin.addEventListener("click", toggleOptions);
// optionLogin.addEventListener("click", toggleOptions);
// optionLoginFirst.addEventListener("click", toggleOptions);
