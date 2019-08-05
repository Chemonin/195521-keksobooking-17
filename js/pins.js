'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var pins = map.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');

  var renderPin = function (advert) {
    var advertPin = pinTemplate.cloneNode(true);
    advertPin.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    advertPin.style.top = advert.location.y - PIN_HEIGTH + 'px';
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.alt = 'Заголовок объявления';
    advertPin.addEventListener('click', function () {
      advertPin.classList.add('.map__pin--active');
      window.renderCard(advert);
    });
    return advertPin;
  };
  var pinsData = [];
  var counter;
  var updatePins = function () {
    var renderList = window.filterPins(pinsData);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < renderList.length; i++) {
      fragment.appendChild(renderPin(renderList[i]));
    }
    counter = renderList.length;
    pins.appendChild(fragment);
  };

  var redrawPins = function () {
    window.removeCard();
    for (var i = 0; i < counter; i++) {
      pins.removeChild(pins.lastChild);
    }
    updatePins();
  };
  var onMapFilterChange = window.util.debounce(function () {
    redrawPins();
  });

  var onMapFilterChange = window.util.debounce(function () {
    redrawPins();
  });

  window.pins = {
    render: function (data) {
      pinsData = data;
      updatePins();
      mapFilter.addEventListener('change', onMapFilterChange);
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
