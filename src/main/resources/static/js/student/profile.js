$(document).ready(function () {
  document.getElementById('editProfileForm').onsubmit = function () {
    var firstNameInput = document.getElementById('firstName')
    var lastNameInput = document.getElementById('lastName')
    var emailInput = document.getElementById('email')
    var phoneInput = document.getElementById('phone')
    if (firstNameInput.value === firstNameInput.defaultValue &&
      lastNameInput.value === lastNameInput.defaultValue &&
      emailInput.value === emailInput.defaultValue &&
      phoneInput.value === phoneInput.defaultValue
    ) {
      alert('Измените хотя бы одно поле')
      return false
    }

    return true
  }
})