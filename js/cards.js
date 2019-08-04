'use strict';

(function () {
  var OFFER_PHOTO_WIDTH = 45;
  var OFFER_PHOTO_HEIGTH = 40;
  var houseType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var form = document.querySelector('.map__filters-container');
  window.removeCard = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
    }
  };

  window.renderCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var photosList = card.querySelector('.popup__photos');
    photosList.innerHTML = '';
    var featureList = card.querySelector('.popup__features');
    featureList.innerHTML = '';
    var fillFeature = function () {
      if (data.offer.features.length > 0) {
        for (var i = 0; i < data.offer.features.length; i++) {
          var feature = document.createElement('li');
          feature.classList.add('popup__feature');
          feature.classList.add('popup__feature--' + data.offer.features[i]);
          featureList.appendChild(feature);
        }
      } else {
        featureList.parentNode.removeChild(featureList);
      }
    };

    var fillPhotos = function () {
      if (data.offer.photos.length > 0) {
        for (var i = 0; i < data.offer.photos.length; i++) {
          var photo = document.createElement('img');
          photo.classList.add('popup__photo');
          photo.src = data.offer.photos[i];
          photo.style.width = OFFER_PHOTO_WIDTH + 'px';
          photo.style.height = OFFER_PHOTO_HEIGTH + 'px';
          photosList.appendChild(photo);
        }
      } else {
        photosList.parentNode.removeChild(photosList);
      }
    };

    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = houseType[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    fillFeature(data);
    var cardDescription = card.querySelector('.popup__description ');
    if (data.offer.description) {
      cardDescription.textContent = data.offer.description;
    } else {
      cardDescription.parentNode.removeChild(cardDescription);
    }
    fillPhotos(data);

    var onDocumentKeydown = function (evt) {
      window.util.isEscEvent(evt, closeCard);
    };
    var closeCard = function () {
      card.parentNode.removeChild(card);
      document.removeEventListener('keydown', onDocumentKeydown);
    };
    var cardCloseBtn = card.querySelector('.popup__close');
    cardCloseBtn.addEventListener('click', function () {
      closeCard();
    });
    document.addEventListener('keydown', onDocumentKeydown);
    window.removeCard();
    form.insertAdjacentElement('beforeBegin', card);
  };
})();
