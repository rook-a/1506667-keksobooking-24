import {createCustomAd} from './create-map.js';
import {addDataErrorPopup} from './popups.js';
import {addPopup} from './popups.js';
import {formReset} from './form-reset.js';

const CREATE_AD_COUNT = 10;
const GET_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const createLoader = () => fetch(GET_DATA_URL)
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

const createUpload = () => {
  const adForm = document.querySelector('.ad-form');
  const UPLOAD_DATA_URL = 'https://24.javascript.pages.academy/keksobooking';

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      UPLOAD_DATA_URL,
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
