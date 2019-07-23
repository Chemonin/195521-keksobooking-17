'use strict';

(function () {
  var MIN_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var typeOfHouse = document.querySelector('#type');
  var priceForNight = document.querySelector('#price');
  priceForNight.min = MIN_PRICE.flat;

  typeOfHouse.addEventListener('change', function () {
    priceForNight.min = MIN_PRICE[typeOfHouse.value];
    priceForNight.placeholder = priceForNight.min;
  });

  var checkin = document.querySelector('#timein');
  var checkout = document.querySelector('#timeout');
  var timeCheck = document.querySelector('.ad-form__element--time');
  var onTimeCheckChange = function (evt) {
    checkout.value = evt.target.value;
    checkin.value = evt.target.value;
  };

  timeCheck.addEventListener('change', onTimeCheckChange);
})();
