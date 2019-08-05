'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var application = document.querySelector('main');

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    messageClose: function (message) {
      var onDocumentKeydown = function (evt) {
        window.util.isEscEvent(evt, closeMessage);
      };

      var onDocumentClick = function () {
        closeMessage();
      };

      var closeMessage = function () {
        application.removeChild(message);
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
      };

      var closeBtn = message.querySelector('button');
      var onCloseBtnClick = function () {
        closeMessage();
      };

      document.addEventListener('keydown', onDocumentKeydown);
      document.addEventListener('click', onDocumentClick);
      if (closeBtn) {
        closeBtn.addEventListener('click', onCloseBtnClick);
      }
      application.appendChild(message);
    },
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
