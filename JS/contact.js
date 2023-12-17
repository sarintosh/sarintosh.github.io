function previewPhoto() {
    var preview = document.getElementById('preview');
    var fileInput = document.getElementById('photo');
    var file = fileInput.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };

      reader.readAsDataURL(file);
    }
  }
  function submitForm() {
    alert('Formulario enviado.');
  }