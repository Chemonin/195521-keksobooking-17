'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var application = document.querySelector('main');

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
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
        window.resetService();
        application.removeChild(message);
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
        // closeBtn.removeEventListener('click', onCloseBtnClick);
      };
      // debugger;
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
    }
  };
})();
