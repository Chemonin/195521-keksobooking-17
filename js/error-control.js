'use strict';

(function () {
  // var ESC_KEYCODE = 27;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  // var application = document.querySelector('main');
  var errorMessage = errorTemplate.cloneNode(true);

  window.onDownloadError = function () {
    // var errorMessage = errorTemplate.cloneNode(true);

    window.util.messageClose(errorMessage);

    // var onDocumentKeydown = function (evt) {
    //   window.util.isEscEvent(evt, closeErrorMessage);
    // };
    //
    // var onDocumentClick = function () {
    //   closeErrorMessage();
    // };
    //
    // var closeErrorMessage = function () {
    //   window.resetService();
    //   application.removeChild(errorMessage);
    //   document.removeEventListener('keydown', onDocumentKeydown);
    //   document.removeEventListener('click', onDocumentClick);
    // };
    //
    // var errorBtn = errorMessage.querySelector('.error__button');
    //
    // document.addEventListener('keydown', onDocumentKeydown);
    // document.addEventListener('click', onDocumentClick);
    // errorBtn.addEventListener('click', function () {
    //   closeErrorMessage();
    // });
    // application.appendChild(errorMessage);
  };
})();
