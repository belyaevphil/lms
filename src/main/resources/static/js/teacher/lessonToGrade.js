window.onload = function () {
  document.getElementById('gradeAnswerForm').onsubmit = function () {
    var currentGrade = document.getElementById('currentGrade')
    var gradeInput = document.getElementById('grade')
    if (currentGrade.innerText === gradeInput.value) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
}