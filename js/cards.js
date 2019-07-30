'use strict';

(function () {
  var HouseType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var form = document.querySelector('.map__filters-container');

  window.renderCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = data[0].author.avatar;
    card.querySelector('.popup__title').textContent = data[0].offer.title;
    card.querySelector('.popup__text--address').textContent = data[0].offer.address;
    card.querySelector('.popup__text--price').textContent = data[0].offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = HouseType[data[0].offer.type];
    card.querySelector('.popup__text--capacity').textContent = data[0].offer.rooms + ' комнаты для ' + data[0].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[0].offer.checkin + ', выезд до ' + data[0].offer.checkout;
    var featureList = card.querySelector('.popup__features');
    featureList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data[0].offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + data[0].offer.features[i]);
      fragment.appendChild(feature);
    }
    featureList.appendChild(fragment);
    card.querySelector('.popup__description ').textContent = data[0].offer.description;

    var photosList = card.querySelector('.popup__photos');
    photosList.innerHTML = '';
    fragment = document.createDocumentFragment();
    // make function
    for (i = 0; i < data[0].offer.photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = data[0].offer.photos[i];
      photo.style.width = 45 + 'px';
      photo.style.height = 40 + 'px';
      fragment.appendChild(photo);
    }
    photosList.appendChild(fragment);


    form.insertAdjacentElement('beforeBegin', card);
  };
})();
