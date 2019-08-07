'use strict';

(function () {
  var ranges = ['any', 'low', 'middle', 'high'];
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var Range = {
    SLICE_START: 0,
    SLICE_END: 5
  };
  var typeOfHouse = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var numberOfRooms = document.querySelector('#housing-rooms');
  var numberOfGuests = document.querySelector('#housing-guests');
  var features = document.querySelector('#housing-features').querySelectorAll('input');

  var finalizeFilter = function (advertsData) {

    var checkOffer = function () {
      return advertsData.filter(function (it) {
        return Object.keys(it.offer).length !== 0 && it.offer.constructor === Object;
      });
    };

    var selectedByFeatures = function () {
      var activeFeatures = [];
      var selectActiveFeatures = function () {
        for (var i = 0; i < features.length; i++) {
          if (features[i].checked) {
            activeFeatures.push(features[i]);
          }
        }
      };
      selectActiveFeatures();
      return advertsData.filter(function (it) {
        var featuresCount = 0;
        for (var i = 0; i < activeFeatures.length; i++) {
          if (it.offer.features.indexOf(activeFeatures[i].value) !== -1) {
            featuresCount++;
          }
        }
        return featuresCount === activeFeatures.length;
      });
    };
    var selectedByGuests = function () {
      return advertsData.filter(function (it) {
        return numberOfGuests.value === ranges[0] || numberOfGuests.value === it.offer.guests.toString();
      });
    };

    var selectedByRooms = function () {
      return advertsData.filter(function (it) {
        return numberOfRooms.value === ranges[0] || numberOfRooms.value === it.offer.rooms.toString();
      });
    };

    var selectedByType = function () {
      return advertsData.filter(function (it) {
        return it.offer.type === typeOfHouse.value || typeOfHouse.value === ranges[0];
      });
    };

    var selectByPrice = function () {
      return advertsData.filter(function (it) {
        return priceFilter.value === ranges[0]
        || priceFilter.value === ranges[2] && it.offer.price <= HIGH_PRICE && it.offer.price >= LOW_PRICE
        || priceFilter.value === ranges[1] && it.offer.price < LOW_PRICE
        || priceFilter.value === ranges[3] && it.offer.price > HIGH_PRICE;
      });
    };

    var typesFilterData = selectedByType();
    var priceFilterData = selectByPrice();
    var roomsFilterData = selectedByRooms();
    var guestsFilterData = selectedByGuests();
    var featuresFilterData = selectedByFeatures();
    var offerFilterData = checkOffer();

    return typesFilterData.filter(function (it) {
      return priceFilterData.indexOf(it) !== -1;
    }).filter(function (it) {
      return roomsFilterData.indexOf(it) !== -1;
    }).filter(function (it) {
      return guestsFilterData.indexOf(it) !== -1;
    }).filter(function (it) {
      return featuresFilterData.indexOf(it) !== -1;
    }).filter(function (it) {
      return offerFilterData.indexOf(it) !== -1;
    });
  };

  window.filterPins = function (dataForFilter) {
    return finalizeFilter(dataForFilter).slice(Range.SLICE_START, Range.SLICE_END);
  };
})();
