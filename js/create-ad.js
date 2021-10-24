import {addZero} from './add-zero.js';
import {getRandomNumber} from './random-elements.js';
import {getRandomNumberDot} from './random-elements.js';
import {getRandomArrayElement} from './random-elements.js';
import {getRandomArrayString} from './random-elements.js';

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

const createAd = (index) => {
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

export {AVATAR_COUNTS};
export {createAd};
