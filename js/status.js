'use strict';

(function () {

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormHeader = noticeForm.querySelector('.ad-form-header');
  var noticeFormElements = noticeForm.querySelectorAll('.ad-form__element');
  var noticeFormAddress = noticeForm.querySelector('#address');
  var mapOfPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var startStateLatch = true;
  var startState = {};
  var activationFlag = false;

  var getPinX = function (pin) {
    return Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  };

  var getPinY = function (pin) {
    return Math.round(pin.offsetTop + pin.offsetHeight / 2);
  };

  var clearData = function () {
    form.reset();
    mapFilter.reset();
    window.removeCard();
    var pins = mapOfPins.querySelectorAll('button');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        mapOfPins.removeChild(pins[i]);
      }
    }
  };

  var onFormResetClick = function (evt) {
    evt.preventDefault();
    window.resetService();
    formReset.removeEventListener('click', onFormResetClick);
  };

  window.resetService = function () {
    activationFlag = true;
    if (startStateLatch) {
      startState.noticeAddress = getPinX(mainPin) + ', ' + getPinY(mainPin);
      startState.pinX = mainPin.style.left;
      startState.pinY = mainPin.style.top;
      startStateLatch = false;
    }
    clearData();
    noticeFormAddress.value = startState.noticeAddress;
    mainPin.style.top = startState.pinY;
    mainPin.style.left = startState.pinX;
    if (!noticeForm.classList.contains('ad-form--disabled')) {
      noticeForm.classList.add('ad-form--disabled');
    }
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');
    }
    noticeFormHeader.disabled = true;
    for (var i = 0; i < noticeFormElements.length; i++) {
      noticeFormElements[i].disabled = true;
    }
  };

  window.activateService = function () {
    if (activationFlag) {
      window.download(window.pins.render, window.errorControl);
      noticeForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      noticeFormHeader.disabled = false;
      for (var i = 0; i < noticeFormElements.length; i++) {
        noticeFormElements[i].disabled = false;
      }
      formReset.addEventListener('click', onFormResetClick);
    }
    activationFlag = false;
  };
})();
