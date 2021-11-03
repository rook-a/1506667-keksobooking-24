import {resetMap} from './create-map.js';
import {onPriceChange} from './form-validity.js';
import {clearAvatarPreview} from './preview-photo.js';
import {clearPhotoPreview} from './preview-photo.js';

const resetForm = document.querySelector('.ad-form');
const resetFormFilter = document.querySelector('.map__filters');
const formBtn = resetForm.querySelector('.ad-form__reset');

const formReset = () => {
  resetFormFilter.reset();
  resetForm.reset();
  onPriceChange();
  resetMap();
  clearAvatarPreview();
  clearPhotoPreview();
};

formBtn.addEventListener('click', formReset);

export {formReset};
