$(document).ready(function () {
  document.getElementById('editCourseNoteForm').onsubmit = function () {
    var noteInput = document.getElementById('note')
    if (noteInput.value === noteInput.defaultValue) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
})