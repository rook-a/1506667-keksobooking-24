const AVATAR_COUNTS = new Array(10).fill(null);
const locationLatMin = 35.65000;
const locationLatMax = 35.70000;
const locationLngMin = 139.70000;
const locationLngMax = 139.80000;
const numbersAfterDot = 5;
const priceMin = 1000;
const priceMax = 10000;
const roomsMin = 1;
const roomsMax = 5;
const guestsMin = 1;
const guestsMax = 10;

const TYPE = [
  'palace',
  'flat',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomNumber = function (from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);

  return (from >= 0 && to > from) ? Math.round(Math.random() * (to - from) + from) : false;
};

const getRandomNumberDot = function (from, to, count = 0) {

  const randomNumber = Math.random() * (to - from) + from;

  return (from >= 0 && to > from && count >= 0) ? Number(randomNumber.toFixed(count)) : false;
};

const addZero = function (count) {
  return count > 0 && count < AVATAR_COUNTS.length ? `0${count}` : count;
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomArrayString = function (arr) {
  const strings = [];

  for (let el = 0; el <= arr.length - 1; el++) {
    if (getRandomNumber(0, 1) > 0) {
      strings.push(arr[el]);
    }
  }

  return strings;
};

const createAd = function (index) {
  const locationLat = getRandomNumberDot(locationLatMin, locationLatMax, numbersAfterDot);
  const locationLng = getRandomNumberDot(locationLngMin, locationLngMax, numbersAfterDot);

  return {
    author: {
      avatar: `img/avatars/user${addZero(index + 1)}.png`,
    },
    offer: {
      title: 'Сдаются комфортные апартаменты',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomNumber(priceMin, priceMax),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(roomsMin, roomsMax),
      guests: getRandomNumber(guestsMin, guestsMax),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKIN),
      features: getRandomArrayString(FEATURES),
      description: 'Просторные комнаты. Высокие потолки. Близко к океану. Бассейн и джакузи на территории.',
      photos: getRandomArrayString(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

AVATAR_COUNTS.map((item, index) => createAd(index));
/*
//для тестов
const test = AVATAR_COUNTS.map((item, index) => createAd(index));
console.log(test);
*/
