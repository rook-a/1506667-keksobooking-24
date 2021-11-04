import {addDataErrorPopup} from './popups.js';
import {addPopup} from './popups.js';
import {formReset} from './form-reset.js';
import {setFilterChange} from './create-data-sort.js';
import {createData} from './create-data-sort.js';
import {addFilterDisabled} from './add-disabled.js';

const GET_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const debounce = (cb, timeoutDelay = 500) => {

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
    setFilterChange(debounce(
      () => createData(data),
    ));
  })
  .catch((err) => {
    addDataErrorPopup(err);
    addFilterDisabled(true);
  });

const createUploadData = () => {
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

createLoaderData();
createUploadData();
