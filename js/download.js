'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var FORM_URL = 'https://js.dump.academy/keksobooking';
  var fileTypes = ['image/jpeg', 'image/gif', 'image/png'];
  var PHOTO_INDENT = '5px';
  var PHOTO_AMOUNT = 14;
  var LoadStatus = {
    OK: 200
  };

  var avatar = document.querySelector('.ad-form-header__preview img');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');
  var imageChooserLabel = document.querySelector('.ad-form__drop-zone');
  var photoConteiner = document.querySelector('.ad-form__photo-container');
  var photoMock = document.querySelector('.ad-form__photo');

  function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
  }

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

    xhr.open('POST', FORM_URL);
    xhr.send(formElement);
  };

  avatarChooser.addEventListener('change', function () {
    var avatarFile = avatarChooser.files[0];
    if (validFileType(avatarFile)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });
      reader.readAsDataURL(avatarFile);
    }
  });

  var onImageChooserChange = function () {
    var noticeFiles = imageChooser.files;
    if (photoConteiner.lastElementChild.classList.contains('ad-form__photo') && photoConteiner.lastElementChild.tagName.toLowerCase() === 'div') {
      photoConteiner.removeChild(photoMock);
    }
    for (var i = 0; i < noticeFiles.length; i++) {
      if (validFileType(noticeFiles[i])) {
        var noticeImage = document.createElement('img');
        noticeImage.classList.add('ad-form__photo');
        noticeImage.style.marginLeft = PHOTO_INDENT;
        noticeImage.src = window.URL.createObjectURL(noticeFiles[i]);
        if (photoConteiner.childElementCount < PHOTO_AMOUNT) {
          photoConteiner.appendChild(noticeImage);
        } else {
          imageChooser.disabled = true;
          imageChooserLabel.textContent = 'Загружено максимальное число фотографии';
        }
      } else {
        photoConteiner.appendChild(photoMock);
      }
    }
  };
  imageChooser.addEventListener('change', onImageChooserChange);
})();
