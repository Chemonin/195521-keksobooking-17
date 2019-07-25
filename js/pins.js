'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');

  var renderPin = function (advert) {
    var advertPin = pinTemplate.cloneNode(true);
    advertPin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    advertPin.style.top = advert.location.y - PIN_HEIGTH + 'px';
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.alt = 'Заголовок объявления';
    return advertPin;
  };

  window.pins = {
    fillList: function (pinList) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pinList.length; i++) {
        fragment.appendChild(renderPin(pinList[i]));
      }
      map.appendChild(fragment);
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
