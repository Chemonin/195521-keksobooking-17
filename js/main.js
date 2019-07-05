'use strict';

var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AMOUNT = 8;
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var getAdverts = function (housingType, amount) {
  var adverts = [];
  for (var i = 0; i < amount; i++) {
    adverts[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': housingType[getRandomInteger(0, housingType.length)]
      },
      'location': {
        'x': getRandomInteger(0, 1200),
        'y': getRandomInteger(130, 630)
      }
    };
  }
  return adverts;
};

var renderPin = function (advert) {
  var advertPin = pinTemplate.cloneNode(true);
  advertPin.style.left = advert.location.x + 'px';
  advertPin.style.top = advert.location.y + 'px';
  advertPin.querySelector('img').src = advert.author.avatar;
  advertPin.alt = 'Заголовок объявления';
  return advertPin;
};

var fillList = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  map.appendChild(fragment);
};

var advertList = getAdverts(HOUSING_TYPE, AMOUNT);
fillList(advertList);

map.classList.remove('map--faded');
