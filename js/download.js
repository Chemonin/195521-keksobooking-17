'use strict';

(function () {
  var TIMEOUT_VALUE = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var LoadStatus = {
    OK: 200
  };
  // var mock = [{
  //   'author': {
  //     'avatar': 'img/avatars/user01.png'
  //   },
  //   'offer': {
  //     'title': 'Уютное гнездышко для молодоженов',
  //     'address': '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
  //     'price': 42000,
  //     'type': 'house',
  //     'rooms': 3,
  //     'guests': 6,
  //     'checkin': '14:00',
  //     'checkout': '10:00',
  //     'features': [
  //       'wifi',
  //       'dishwasher',
  //       'parking',
  //       'washer',
  //       'elevator',
  //       'conditioner'
  //     ],
  //     'description': 'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  //     'photos': [
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_25_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_27_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_17_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/11000000/10360000/10357700/10357605/10357605_30_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_1_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_12_b.jpg',
  //       'https://cdn.ostrovok.ru/t/x500/mec/hotels/10000000/9160000/9151200/9151174/9151174_5_b.jpg'
  //     ]
  //   },
  //   'location': {
  //     'x': 428,
  //     'y': 493
  //   }
  // },
  // {
  //   'author': {
  //     'avatar': 'img/avatars/user02.png'
  //   },
  //   'offer': {
  //     'title': 'Маленькая квартирка рядом с парком',
  //     'address': '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  //     'price': 30000,
  //     'type': 'flat',
  //     'rooms': 1,
  //     'guests': 1,
  //     'checkin': '9:00',
  //     'checkout': '7:00',
  //     'features': [
  //       'elevator',
  //       'conditioner'
  //     ],
  //     'description': 'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  //     'photos': [
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/01488611-c1f9-4854-ad67-9f0ad3e857e6.jpeg',
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/d976dd4b-2a7e-415a-a2a2-afc51caf8006.jpeg'
  //     ]
  //   },
  //   'location': {
  //     'x': 471,
  //     'y': 545
  //   }
  // },
  // {
  //   'author': {
  //     'avatar': 'img/avatars/user03.png'
  //   },
  //   'offer': {
  //     'title': 'Небольшая лавочка в парке',
  //     'address': 'Chiyoda-ku, Tōkyō-to 102-0091',
  //     'price': 100,
  //     'type': 'bungalo',
  //     'rooms': 0,
  //     'guests': 0,
  //     'checkin': '0:00',
  //     'checkout': '0:00',
  //     'features': [],
  //     'description': 'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  //     'photos': []
  //   },
  //   'location': {
  //     'x': 744,
  //     'y': 534
  //   }
  // },
  // {
  //   'author': {
  //     'avatar': 'img/avatars/user07.png'
  //   },
  //   'offer': {
  //     'title': 'Стандартная квартира в центре',
  //     'address': 'Chiyoda-ku, Tōkyō-to 102-0082',
  //     'price': 60000,
  //     'type': 'flat',
  //     'rooms': 3,
  //     'guests': 5,
  //     'checkin': '17:00',
  //     'checkout': '16:00',
  //     'features': [
  //       'wifi',
  //       'dishwasher',
  //       'washer',
  //       'conditioner'
  //     ],
  //     'description': 'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  //     'photos': [
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/987935fb-633a-46b8-9b76-76af9f35c5e3.jpeg',
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/434b2eda-5af9-4b93-b97d-4e7514621ff1.jpeg',
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/fa9c3bba-a64a-4019-ab50-102bf6e5d691.jpeg',
  //       'https://cdn.ostrovok.ru/t/x500/carsolize/images/hotels/f779d886-18a6-4ffb-b7c2-f5d4d0c8952a.jpeg'
  //     ]
  //   },
  //   'location': {
  //     'x': 452,
  //     'y': 382
  //   }
  // }];

  window.download = function (onSuccess, onError) {
  // window.download = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === LoadStatus.OK) {
        onSuccess(xhr.response);
      } else {
        // onSuccess(mock);
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      // onSuccess(mock);
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_VALUE;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
