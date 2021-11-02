import {createCustomAd} from './create-map.js';
import {pinGroup} from './create-map.js';

const checkboxFilters = document.querySelectorAll('.map__checkbox');
const selectFilters = document.querySelectorAll('.map__filter');
const typeFilters = document.querySelector('#housing-type');
const priceFilters = document.querySelector('#housing-price');
const roomsFilters = document.querySelector('#housing-rooms');
const guestsFilters = document.querySelector('#housing-guests');

const CREATE_AD_COUNT = 10;
const LOW = 10000;
const HIGH = 50000;
const DEFAULT = 'any';

const typeCheck = (obj) => {
  if (obj.offer.type === typeFilters.value || typeFilters.value === DEFAULT) {
    return true;
  }
};

const roomsCheck = (obj) => {
  if (obj.offer.rooms === Number(roomsFilters.value) || roomsFilters.value === DEFAULT) {
    return true;
  }
};

const guestsCheck = (obj) => {
  if (obj.offer.guests === Number(guestsFilters.value) || guestsFilters.value === DEFAULT) {
    return true;
  }
};

const priceCheck = (obj) => {
  const MIDDLE_PRICE = obj.offer.price >= LOW && obj.offer.price <= HIGH;
  const LOW_PRICE = obj.offer.price <= LOW;
  const HIGH_PRICE = obj.offer.price >= HIGH;

  if (priceFilters.value === DEFAULT) {
    return true;
  }

  if (priceFilters.value === 'middle' && MIDDLE_PRICE) {
    return true;
  }

  if (priceFilters.value === 'low' && LOW_PRICE) {
    return true;
  }

  if (priceFilters.value === 'high' && HIGH_PRICE) {
    return true;
  }
};

const getAdRank = (obj) => {
  let rank = 0;

  if (!obj.offer.features) {
    rank -= 1;
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
  pinGroup.clearLayers();
  arr
    .slice()
    .filter((obj) => typeCheck(obj) && priceCheck(obj) && roomsCheck(obj) && guestsCheck(obj))
    .sort(compareAd)
    .slice(0, CREATE_AD_COUNT)
    .forEach((item) => {
      createCustomAd(item);
    });
};

export {setFilterChange};
export {createSortData};
