import {resetMap} from './create-map.js';

const resetForm = document.querySelector('.ad-form');
const formBtn = resetForm.querySelector('.ad-form__reset');

const formReset = () => {
  resetForm.reset();
  resetMap();
};

formBtn.addEventListener('click', formReset);

export {formReset};
