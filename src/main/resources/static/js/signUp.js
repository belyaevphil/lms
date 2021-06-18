window.onload = function () {
  document.getElementById('signupForm').onsubmit = function () {
    var passwordInput = document.getElementById('password')
    var confirmPasswordInput = document.getElementById('confirmPassword')
    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Пароли должны совпадать')
      return false
    }
    return true
  }
}