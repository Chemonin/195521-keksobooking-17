'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var FORM_URL = 'https://js.dump.academy/keksobooking';
  var LoadStatus = {
    OK: 200
  };

  window.download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === LoadStatus.OK) {
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
  window.upload = function (onSuccess, onError, formData) {
    var formElement = new FormData(formData);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === LoadStatus.OK) {
        onSuccess();
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

    xhr.open('POST', FORM_URL);
    xhr.send(formElement);
  };
})();
