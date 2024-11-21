const optionsLogin = document.querySelector(".login-options");
const firstAcess = document.querySelector(".login-option-link.first-acess");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const sendAuth = document.querySelector("#send-auth");

const toggleOptions = (event) => {
  const target = event.target;
  if (target.classList.contains("login-option-link")) {
    document.querySelectorAll(".login-option-link").forEach((element) => {
      element.classList.remove("option-active");
    });
    target.classList.toggle("option-active");

    if (target.classList.contains("first-acess")) {
      username.placeholder = "Insira seu RA";
      password.placeholder = "Crie sua senha";
    } else {
      username.placeholder = "Insira seu RA ou e-mail";
      password.placeholder = "Insira sua senha";
    }
  }
};

optionsLogin.addEventListener("click", toggleOptions);

sendAuth.addEventListener("click", (event) => {
  event.preventDefault();

  switch (username.value + password.value) {
    case "admin1234":
      window.location.href = "/goe";
      break;
    case "aluno1234":
      window.location.href = "/aluno";
      break;
    case "professor1234":
      window.location.href = "/professor";
      break;
    default:
      alert("Usuário ou senha inválidos");
  }
});
