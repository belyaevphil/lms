var password = document.getElementById("password");
var repeatPassword = document.getElementById("repeatPassword");

function validatePassword() {
  if (password.value != repeatPassword.value) {
    repeatPassword.setCustomValidity("Пароли не совпадают");
  }
}