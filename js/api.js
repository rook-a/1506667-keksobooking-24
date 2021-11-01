import {addDataErrorPopup} from './popups.js';
import {addPopup} from './popups.js';
import {formReset} from './form-reset.js';
import {createSortData} from './create-data-sort.js';
import {setFilterChange} from './create-data-sort.js';

const GET_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const debounce = (cb, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

const createLoader = () => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    createSortData(data);
    setFilterChange(debounce(
      () => createSortData(data),
    ));
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
