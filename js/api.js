import {addDataErrorPopup} from './popups.js';
import {addPopup} from './popups.js';
import {formReset} from './form-reset.js';
import {onClickBtn} from './form-reset.js';
import {setFilterChange} from './create-data.js';
import {createData} from './create-data.js';
import {addFilterDisabled} from './add-disabled.js';

const GET_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const DELAY = 500;

const debounce = (cb, timeoutDelay = DELAY) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

const createLoaderData = () => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    createData(data);
    onClickBtn(debounce(
      () => createData(data),
    ));
    setFilterChange(debounce(
      () => createData(data),
    ));
  })
  .catch((err) => {
    addDataErrorPopup(err);
    addFilterDisabled(true);
  });

const createUploadData = () => {
  const adFormContainer = document.querySelector('.ad-form');
  const UPLOAD_DATA_URL = 'https://24.javascript.pages.academy/keksobooking';

  adFormContainer.addEventListener('submit', (evt) => {
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

createLoaderData();
createUploadData();
