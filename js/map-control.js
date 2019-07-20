'use strict';

(function () {
  var PIN_NIIDLE_HEIGHT = 16;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormHeader = noticeForm.querySelector('.ad-form-header');
  var noticeFormElements = noticeForm.querySelectorAll('.ad-form__element');
  var noticeFormAddress = noticeForm.querySelector('#address');

  var getPinX = function (pin) {
    return Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  };

  var getPinY = function (pin) {
    return Math.round(pin.offsetTop + pin.offsetHeight / 2);
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

  var flag = true;
  switchServiceStatus(flag);
  flag = false;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!flag) {
      window.pins.fillList(map);
      switchServiceStatus(flag);
    }
    var startCords = {
      x: evt.offsetLeft,
      y: evt.offsetTop
    };
    var onMouesMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      window.pins.checkBorder(mainPin);

      noticeFormAddress.value = getPinX(mainPin) + ', ' + (getPinY(mainPin) + Math.round(mainPin.offsetHeight / 2 + PIN_NIIDLE_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      flag = true;

      noticeFormAddress.value = getPinX(mainPin) + ', ' + (getPinY(mainPin) + Math.round(mainPin.offsetHeight / 2 + PIN_NIIDLE_HEIGHT));
      map.removeEventListener('mousemove', onMouesMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouesMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
