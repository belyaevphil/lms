window.onload = function () {
  document.getElementById('gradeAnswerForm').onsubmit = function () {
    var gradeInput = document.getElementById('grade')
    if (gradeInput.value === gradeInput.defaultValue) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
}