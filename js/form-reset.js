import {resetMap} from './create-map.js';
import {onPriceChange} from './form-validity.js';

const resetForm = document.querySelector('.ad-form');
const resetFormFilter = document.querySelector('.map__filters');
const formBtn = resetForm.querySelector('.ad-form__reset');

const formReset = () => {
  resetFormFilter.reset();
  resetForm.reset();
  onPriceChange();
  resetMap();
};

formBtn.addEventListener('click', formReset);

export {formReset};
