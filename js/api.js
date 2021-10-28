import {createCustomAd} from './create-map.js';
import {addDataErrorPopup} from './popups.js';
import {addPopup} from './popups.js';
import {formReset} from './form-reset.js';

const createLoader = () => {
  const CREATE_AD_COUNT = 10;

  return fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      data.slice(0, CREATE_AD_COUNT)
        .forEach((item) => createCustomAd(item));
    })
    .catch((err) => {
      addDataErrorPopup(err);
    });
};

const createUpload = () => {
  const adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          addPopup('success');
          formReset();
        } else {
          addPopup('error');
        }
      })
      .catch(() => addPopup('error'));
  });
};

createLoader();
createUpload();
