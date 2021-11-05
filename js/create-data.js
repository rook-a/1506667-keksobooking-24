import {createCustomAd} from './create-map.js';
import {pinGroup} from './create-map.js';

const CREATE_AD_COUNT_FROM = 0;
const CREATE_AD_COUNT_UP_TO = 10;
const LOW = 10000;
const HIGH = 50000;
const DEFAULT = 'any';

const checkboxFilters = document.querySelectorAll('.map__checkbox');
const selectFilters = document.querySelectorAll('.map__filter');
const typeFilters = document.querySelector('#housing-type');
const priceFilters = document.querySelector('#housing-price');
const roomsFilters = document.querySelector('#housing-rooms');
const guestsFilters = document.querySelector('#housing-guests');

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

const checkFeatures = (obj) => {
  const checkboxInputs = document.querySelectorAll('.map__checkbox:checked');
  const checkboxes = Array.from(checkboxInputs);

  if (!obj.offer.features) {
    return false;
  }

  const checkboxValue = checkboxes.map((item) => item.value);
  const filteredValue = checkboxValue.filter((value) => obj.offer.features.includes(value));

  return checkboxValue.length === filteredValue.length;
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

const createData = (arr) => {
  pinGroup.clearLayers();
  arr
    .filter((obj) => typeCheck(obj) && priceCheck(obj) && roomsCheck(obj) && guestsCheck(obj) && checkFeatures(obj))
    .slice(CREATE_AD_COUNT_FROM, CREATE_AD_COUNT_UP_TO)
    .forEach((item) => {
      createCustomAd(item);
    });
};

export {setFilterChange};
export {createData};
