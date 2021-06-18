$(document).ready(function () {
  $('#description').summernote({
    height: 300,
    placeholder: 'Задание к уроку',
    lang: 'ru-RU',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ]
  })

  document.getElementById('editLessonForm').onsubmit = function () {
    var nameInput = document.getElementById('name')
    var descriptionInput = document.getElementById('description')
    if (nameInput.value === nameInput.defaultValue || descriptionInput.value === descriptionInput.defaultValue) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
})