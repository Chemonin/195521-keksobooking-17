'use strict';

(function () {
  var houseType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var form = document.querySelector('.map__filters-container');

  window.renderCard = function (data) {

    var fillFeature = function (features) {
      if (features.offer.features) {
        var featureList = card.querySelector('.popup__features');
        featureList.innerHTML = '';
        for (var i = 0; i < features.offer.features.length; i++) {
          var feature = document.createElement('li');
          feature.classList.add('popup__feature');
          feature.classList.add('popup__feature--' + features.offer.features[i]);
          featureList.appendChild(feature);
        }
      } else {
        featureList.parentNode.removeChild(featureList);
      }
    };

    var fillPhotos = function (photos) {
      if (photos.offer.photos) {
        var photosList = card.querySelector('.popup__photos');
        photosList.innerHTML = '';
        for (var i = 0; i < photos.offer.photos.length; i++) {
          var photo = document.createElement('img');
          photo.classList.add('popup__photo');
          photo.src = photos.offer.photos[i];
          photo.style.width = 45 + 'px';
          photo.style.height = 40 + 'px';
          photosList.appendChild(photo);
        }
      } else {
        photosList.parentNode.removeChild(photosList);
      }
    };
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = houseType[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data[0].offer.checkout;
    fillFeature(data);
    card.querySelector('.popup__description ').textContent = data.offer.description;
    fillPhotos(data);
    form.insertAdjacentElement('beforeBegin', card);
  };
})();
