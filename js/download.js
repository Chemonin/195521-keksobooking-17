'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
