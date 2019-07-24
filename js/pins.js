'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorHandler = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    var errorBtn = errorMessage.querySelector('.error__button');
    errorBtn.addEventListener('click', function () {
      window.location.reload();
    });
    document.body.appendChild(errorMessage);
  };

  var adverts = [];

  var getAdverts = function (advertData) {
    for (var i = 0; i < advertData.length; i++) {
      adverts[i] = advertData[i];
    }
  };

  window.download(getAdverts, errorHandler);

  var renderPin = function (advert) {
    var advertPin = pinTemplate.cloneNode(true);
    advertPin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    advertPin.style.top = advert.location.y - PIN_HEIGTH + 'px';
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.alt = 'Заголовок объявления';
    return advertPin;
  };

  window.pins = {
    fillList: function (mapSpace) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        fragment.appendChild(renderPin(adverts[i]));
      }
      mapSpace.appendChild(fragment);
    },
    checkBorder: function (pin) {
      if (pin.offsetTop < Y_MIN) {
        pin.style.top = Y_MIN + 'px';
      }
      if (pin.offsetTop > Y_MAX) {
        pin.style.top = Y_MAX + 'px';
      }
      if (pin.offsetLeft < -(pin.offsetWidth / 2)) {
        pin.style.left = -(pin.offsetWidth / 2) + 'px';
      }
      if (pin.offsetLeft > pin.parentElement.clientWidth - (pin.offsetWidth / 2)) {
        pin.style.left = pin.parentElement.clientWidth - (pin.offsetWidth / 2) + 'px';
      }
    }
  };
})();
