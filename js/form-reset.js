import {resetMap} from './create-map.js';
import {onPriceChange} from './form-validity.js';
import {clearAvatarPreview} from './preview-photo.js';
import {clearPhotoPreview} from './preview-photo.js';

const resetFormContainer = document.querySelector('.ad-form');
const resetFormFilterContainer = document.querySelector('.map__filters');
const formBtnContainer = resetFormContainer.querySelector('.ad-form__reset');

const formReset = () => {
  resetFormFilterContainer.reset();
  resetFormContainer.reset();
  onPriceChange();
  resetMap();
  clearAvatarPreview();
  clearPhotoPreview();
};

const onClickBtn = (cb) => {
  formBtnContainer.addEventListener('click', () => {
    formReset();
    cb();
  });
};

export {formReset};
export {onClickBtn};
