'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var application = document.querySelector('main');

  window.onDownloadError = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    var onDocumentKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onErrorClose();
      }
    };
    var onErrorClose = function () {
      application.removeChild(errorMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onErrorClose);
    };
    var errorBtn = errorTemplate.querySelector('.error__button');

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onErrorClose);
    errorBtn.addEventListener('click', onErrorClose);
    application.appendChild(errorMessage);
  };
})();
