import {createCustomAd} from './create-map.js';
import {pinGroup} from './create-map.js';

const CREATE_AD_COUNT_FROM = 0;
const CREATE_AD_COUNT_UP_TO = 10;
const LOW = 10000;
const HIGH = 50000;
const DEFAULT = 'any';

const checkboxFiltersContainer = document.querySelectorAll('.map__checkbox');
const selectFiltersContainer = document.querySelectorAll('.map__filter');
const typeFiltersContainer = document.querySelector('#housing-type');
const priceFiltersContainer = document.querySelector('#housing-price');
const roomsFiltersContainer = document.querySelector('#housing-rooms');
const guestsFiltersContainer = document.querySelector('#housing-guests');

const typeCheck = (obj) => {
  if (obj.offer.type === typeFiltersContainer.value || typeFiltersContainer.value === DEFAULT) {
    return true;
  }
};

const roomsCheck = (obj) => {
  if (obj.offer.rooms === Number(roomsFiltersContainer.value) || roomsFiltersContainer.value === DEFAULT) {
    return true;
  }
};

const guestsCheck = (obj) => {
  if (obj.offer.guests === Number(guestsFiltersContainer.value) || guestsFiltersContainer.value === DEFAULT) {
    return true;
  }
};

const priceCheck = (obj) => {
  const MIDDLE_PRICE = obj.offer.price >= LOW && obj.offer.price <= HIGH;
  const LOW_PRICE = obj.offer.price <= LOW;
  const HIGH_PRICE = obj.offer.price >= HIGH;

  if (priceFiltersContainer.value === DEFAULT) {
    return true;
  }

  if (priceFiltersContainer.value === 'middle' && MIDDLE_PRICE) {
    return true;
  }

  if (priceFiltersContainer.value === 'low' && LOW_PRICE) {
    return true;
  }

  if (priceFiltersContainer.value === 'high' && HIGH_PRICE) {
    return true;
  }
};

const checkFeatures = (obj) => {
  const checkboxInputsContainer = document.querySelectorAll('.map__checkbox:checked');
  const checkboxes = Array.from(checkboxInputsContainer);

  if (!obj.offer.features) {
    return false;
  }

  const checkboxValue = checkboxes.map((item) => item.value);
  const filteredValue = checkboxValue.filter((value) => obj.offer.features.includes(value));

  return checkboxValue.length === filteredValue.length;
};

const setFilterChange = (cb) => {
  selectFiltersContainer.forEach((item) => {
    item.addEventListener('change', () => {
      cb();
    });
  });

  checkboxFiltersContainer.forEach((item) => {
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
