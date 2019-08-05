'use strict';

(function () {
  var PIN_NIIDLE_HEIGHT = 16;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.ad-form');
  var noticeFormAddress = noticeForm.querySelector('#address');

  var getPinX = function (pin) {
    return Math.round(pin.offsetLeft + pin.offsetWidth / 2);
  };

  var getPinY = function (pin) {
    return Math.round(pin.offsetTop + pin.offsetHeight / 2);
  };

  window.resetService();
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.activateService();
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
      noticeFormAddress.value = getPinX(mainPin) + ', ' + (getPinY(mainPin) + Math.round(mainPin.offsetHeight / 2 + PIN_NIIDLE_HEIGHT));
      map.removeEventListener('mousemove', onMouesMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    map.addEventListener('mousemove', onMouesMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
