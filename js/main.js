'use strict';

var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
        'x': getRandomInteger(X_MIN, map.offsetWidth),
        'y': getRandomInteger(Y_MIN, Y_MAX)
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

var switchServiceStatus = function (key) {
  noticeFormAddress.value = getPinX(mainPin) + ', ' + getPinY(mainPin);
  if (!key) {
    noticeForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
  }
  noticeFormHeader.disabled = key;
  for (var i = 0; i < noticeFormElements.length; i++) {
    noticeFormElements[i].disabled = key;
  }
};

var onMainPinClick = function () {
  var advertList = getAdverts(HOUSING_TYPES, AMOUNT);
  fillList(advertList);
  flag = false;
  switchServiceStatus(flag);
  mainPin.removeEventListener('click', onMainPinClick);
};

var getPinX = function (pin) {
  return Math.round(pin.offsetLeft + pin.offsetWidth / 2);
};

var getPinY = function (pin) {
  return Math.round(pin.offsetTop + pin.offsetHeight / 2);
};

var noticeForm = document.querySelector('.ad-form');
var noticeFormHeader = noticeForm.querySelector('.ad-form-header');
var noticeFormElements = noticeForm.querySelectorAll('.ad-form__element');
var mainPin = document.querySelector('.map__pin--main');
var noticeFormAddress = noticeForm.querySelector('#address');
var flag = true;
switchServiceStatus(flag);


mainPin.addEventListener('click', onMainPinClick);

// mainPin.addEventListener('mouseup', function () {
//   noticeFormAddress.value = getPinX(mainPin) + ', ' + getPinY(mainPin);
// });
