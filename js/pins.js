'use strict';

(function () {
  var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var AMOUNT = 8;
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
  var getAdverts = function (houseType, amount) {
    var adverts = [];
    for (var i = 0; i < amount; i++) {
      adverts[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': houseType[getRandomInteger(0, houseType.length)]
        },
        'location': {
          'x': getRandomInteger(X_MIN, map.offsetWidth),
          'y': getRandomInteger(Y_MIN, Y_MAX)
        }
      };
    }
    return adverts;
  };
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
      var list = getAdverts(HOUSING_TYPES, AMOUNT);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < list.length; i++) {
        fragment.appendChild(renderPin(list[i]));
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
