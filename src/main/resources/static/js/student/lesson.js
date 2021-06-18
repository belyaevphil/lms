$(document).ready(function () {
  $('#answer').summernote({
    height: 300,
    placeholder: 'Ответ на задание',
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

  document.getElementById('addAnswerForm').onsubmit = function () {
    var answerInput = document.getElementById('answer')
    if (answerInput.value === answerInput.defaultValue) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
})