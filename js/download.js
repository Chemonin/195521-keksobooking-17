'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
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
        window.alert('first');
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      window.alert('second');
      onError();
    });
    xhr.addEventListener('timeout', function () {
      window.alert('third');
      onError();
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
