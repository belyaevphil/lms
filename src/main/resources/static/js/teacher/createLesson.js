$(document).ready(function () {
  $('#description').summernote({
    height: 500,
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

  document.getElementById('createLessonForm').onsubmit = function () {
    if ($('#description').summernote('isEmpty')) {
      alert('Поле не должно быть пустым')
      return false
    }

    return true
  }
})