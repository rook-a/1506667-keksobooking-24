const AVATAR_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

const CHECKOUT = [
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
  return count > 0 && count < 10 ? `0${count}` : count;
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const createAd = function (index) {
  return {
    author: {
      avatar: `img/avatars/user${addZero(index + 1)}.png`,
    },
    offer: {
      title: 'Сдаются комфортные апартаменты',
      address: `${getRandomNumberDot(35.65000, 35.70000, 5)} ${getRandomNumberDot(139.70000, 139.80000, 5)}`,
      price: getRandomNumber(1000, 10000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArrayElement(FEATURES),
      description: 'Просторные комнаты. Высокие потолки. Близко к океану. Бассейн и джакузи на территории.',
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: getRandomNumberDot(35.65000, 35.70000, 5),
      lng: getRandomNumberDot(139.70000, 139.80000, 5),
    },
  };
};

AVATAR_COUNTS.map((item, index) => createAd(index));

//для тестов
/*
const test = AVATAR_COUNTS.map((item, index) => createAd(index));
console.log(test);
*/
