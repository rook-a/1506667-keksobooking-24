import {createCustomAd} from './create-map.js';
import {pinGroup} from './create-map.js';

const checkboxFilters = document.querySelectorAll('.map__checkbox');
const selectFilters = document.querySelectorAll('.map__filter');
const typeFilters = document.querySelector('#housing-type');
const priceFilters = document.querySelector('#housing-price');
const roomsFilters = document.querySelector('#housing-rooms');
const guestsFilters = document.querySelector('#housing-guests');

const LOW = 10000;
const HIGH = 50000;

const getAdRank = (obj) => {
  const MIDDLE_PRICE = obj.offer.price >= LOW && obj.offer.price <= HIGH;
  const LOW_PRICE = obj.offer.price < LOW;
  const HIGH_PRICE = obj.offer.price > HIGH;

  let rank = 0;

  if (obj.offer.type === typeFilters.value) {
    rank += 1;
  } else {
    rank += -1;
  }

  if (priceFilters.value === 'middle' && MIDDLE_PRICE) {
    rank += 1;
  } else if (priceFilters.value === 'low' && LOW_PRICE) {
    rank += 1;
  }else if (priceFilters.value === 'high' && HIGH_PRICE) {
    rank += 1;
  } else {
    rank += -1;
  }

  if (`${obj.offer.rooms}` === roomsFilters.value) {
    rank += 1;
  } else {
    rank += -1;
  }

  if (`${obj.offer.guests}` === guestsFilters.value) {
    rank += 1;
  } else {
    rank += -1;
  }

  if (!obj.offer.features) {
    rank += -1;
  } else {
    obj.offer.features.forEach((feature) => {
      checkboxFilters.forEach((item) => {
        if ((feature === item.value) && item.checked) {
          rank += 1;
        }
      });
    });
  }

  return rank;
};

const compareAd = (adOne, adTwo) => {
  const rankOne = getAdRank(adOne);
  const rankTwo = getAdRank(adTwo);

  return rankTwo - rankOne;
};

const setFilterChange = (cb) => {
  selectFilters.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });

  checkboxFilters.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });
};

const createSortData = (arr) => {
  const CREATE_AD_COUNT = 10;
  pinGroup.clearLayers();
  arr
    .slice()
    .sort(compareAd)
    .slice(0, CREATE_AD_COUNT)
    .forEach((item) => {
      createCustomAd(item);
    });
};

export {createSortData};
export {setFilterChange};
