'use strict';

(function () {
  var MIN_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };
  var PlacementValue = {
    ONE_ELEMENT: '1',
    TWO_ELEMENT: '2',
    THREE_ELEMENT: '3',
    EMPTY: '0',
    HUNDRED_ELEMENT: '100'
  };

  var typeOfHouse = document.querySelector('#type');
  var priceForNight = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  priceForNight.min = MIN_PRICE.flat;
  var submit = document.querySelector('.ad-form__submit');
  var form = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var showSuccess = function () {
    window.resetService();
    var successMessage = successTemplate.cloneNode(true);
    window.util.messageClose(successMessage);
  };

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.upload(showSuccess, window.errorControl, form);
  });

  form.addEventListener('change', function (evt) {
    if (evt.target === roomNumber || evt.target === capacity) {
      if (roomNumber.value === PlacementValue.ONE_ELEMENT && capacity.value !== PlacementValue.ONE_ELEMENT) {
        capacity.setCustomValidity('Выберите: "для 1 гостя"');
      } else if (roomNumber.value === PlacementValue.TWO_ELEMENT && (capacity.value === PlacementValue.THREE_ELEMENT || capacity.value === PlacementValue.EMPTY)) {
        capacity.setCustomValidity('Выберите: "для 1 гостя" или "для 2 гостей"');
      } else if (roomNumber.value === PlacementValue.THREE_ELEMENT && capacity.value === PlacementValue.EMPTY) {
        capacity.setCustomValidity('Выберите: "для 1 гостя", "для 2 гостей" или "для 3 гостей"');
      } else if (roomNumber.value === PlacementValue.HUNDRED_ELEMENT && capacity.value !== PlacementValue.EMPTY) {
        capacity.setCustomValidity('Выберите: "не для гостей"');
      } else {
        capacity.setCustomValidity('');
      }
    }
  });

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
