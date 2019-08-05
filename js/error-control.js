'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);

  window.errorControl = function () {
    window.resetService();
    window.util.messageClose(errorMessage);
  };
})();
