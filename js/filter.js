'use strict';

(function () {
  var typeOfHouse = document.querySelector('#housing-type');
  var ANY_HOUSE = 'any';
  var Range = {
    SLICE_START: 0,
    SLICE_END: 5
  };

  var selectedByType = function (advertsData) {
    var selectedData = advertsData.filter(function (it) {
      return it.offer.type === typeOfHouse.value;
    });
    if (selectedData.length === 0 && typeOfHouse.value === ANY_HOUSE) {
      selectedData = advertsData;
    }
    return selectedData;
  };

  window.filterPins = function (dataForFilter) {
    return selectedByType(dataForFilter).slice(Range.SLICE_START, Range.SLICE_END);
  };
})();
