$(document).ready(function () {
  $('#description').summernote({
    height: 1000,
    placeholder: 'Описание курса',
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

  document.getElementById('editCourseForm').onsubmit = function () {
    var descriptionInput = document.getElementById('description')
    var priceInput = document.getElementById('price')
    var vendorCodeInput = document.getElementById('vendorCode')
    if (descriptionInput.value === descriptionInput.defaultValue &&
      priceInput.value === priceInput.defaultValue &&
      vendorCodeInput.value === vendorCodeInput.defaultValue
    ) {
      alert('Измените хотя бы одно поле')
      return false
    }
    return true
  }
})