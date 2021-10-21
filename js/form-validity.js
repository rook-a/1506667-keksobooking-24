const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adTypes = adForm.querySelector('#type');
const adRooms = adForm.querySelector('#room-number');
const adCapacity = adForm.querySelector('#capacity');
const adCapacityOption = Array.from(adCapacity.children);
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const PRICE_TO_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const ROOMS_TO_CAPACITY = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

//title
adTitle.addEventListener('invalid', () => {
  const valueLength = adTitle.value.length;

  if (adTitle.validity.valueMissing) {
    adTitle.classList.add('ad-form__element-error');
    adTitle.setCustomValidity('Обязательное поле');
    return;
  }

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.classList.add('ad-form__element-error');
    adTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    return;
  }

  if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.classList.add('ad-form__element-error');
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
    return;
  }
  adTitle.classList.remove('ad-form__element-error');
  adTitle.setCustomValidity('');
});

adTitle.addEventListener('input', () => {
  adTitle.reportValidity();
});

//price
adPrice.addEventListener('invalid', () => {
  if (adPrice.validity.valueMissing) {
    adPrice.classList.add('ad-form__element-error');
    adPrice.setCustomValidity('Обязательное поле');
    return;
  }

  if (adPrice.value > MAX_PRICE_VALUE) {
    adPrice.classList.add('ad-form__element-error');
    adPrice.setCustomValidity(`Слишком высокая цена за ночь. Уменьшите цену на ${adPrice.value - MAX_PRICE_VALUE} руб.`);
    return;
  }

  if (adPrice.value < adPrice.min) {
    adPrice.classList.add('ad-form__element-error');
    adPrice.setCustomValidity(`Цена за ночь меньше допустимой. Увеличьте цену на ${adPrice.min - adPrice.value} руб.`);
    return;
  }

  adPrice.setCustomValidity('');
  adPrice.classList.remove('ad-form__element-error');
});

adPrice.addEventListener('input', () => {
  /*
  const priceValue = adPrice.value;

  if (priceValue > MAX_PRICE_VALUE) {
    adPrice.classList.add('ad-form__element-error');
    adPrice.setCustomValidity(`Слишком высокая цена за ночь. Уменьшите цену на ${priceValue - MAX_PRICE_VALUE} руб.`);
    return;
  }

  if (priceValue < adPrice.min) {
    adPrice.classList.add('ad-form__element-error');
    adPrice.setCustomValidity(`Цена за ночь меньше допустимой. Увеличьте цену на ${adPrice.min - priceValue} руб.`);
    return;
  }

  adPrice.setCustomValidity('');
  adPrice.classList.remove('ad-form__element-error');
  */
  adPrice.reportValidity();
});

//type
const onPriceChange = () => {
  adPrice.placeholder = PRICE_TO_TYPE[adTypes.value];
  adPrice.setAttribute('min', PRICE_TO_TYPE[adTypes.value]);
};

adTypes.addEventListener('change', onPriceChange);

//adRooms && adCapacity
const onElementInvalid = () => {
  if (adRooms.value >= adCapacity.value) {
    adRooms.setCustomValidity('');
  } else {
    adRooms.setCustomValidity('Комнат не хватает!');
  }

  if (adRooms.value < adCapacity.value) {
    adRooms.setCustomValidity('Нужно больше комнат!');
  } else {
    adRooms.setCustomValidity('');
  }
};

const onElementChange = () => {
  if (adRooms.value >= adCapacity.value) {
    adRooms.setCustomValidity('');
  } else {
    adRooms.setCustomValidity('Комнат не хватает!');
  }

  if (adRooms.value < adCapacity.value) {
    adRooms.setCustomValidity('Нужно больше комнат!');
  } else {
    adRooms.setCustomValidity('');
  }

  //---------------------------------------
  /*
  этот блок 146-159 находит нужные значения, но блокирует часть нужных

  ROOMS_TO_CAPACITY[adRooms.value].forEach((item) => {
    for (let i = 0; i < adCapacity.length; i++) {
      console.log(`item = ${item}`);
      console.log(`value = ${adCapacity[i]}`);

      if (adCapacity[i].value === `${item}`) {
        adCapacity[i].removeAttribute('disabled', 'disabled');
        console.log(true);
      } else {
        adCapacity[i].setAttribute('disabled', 'disabled');
        console.log(false);
      }
    }
  });
  */
  //-----------------------------------------------------------------
  adRooms.reportValidity();
  adCapacity.reportValidity();
};

const switchGuestsCapacity = (rooms) => {
  adCapacityOption.forEach((item) => {
    //console.log(item.value); //значение option.value
    //console.log(ROOMS_TO_CAPACITY[rooms]); //массив гостей
    //console.log(rooms); //value выбранного значения
    //console.log(ROOMS_TO_CAPACITY[rooms].includes(`${item.value}`));
    //console.log(item.value === ROOMS_TO_CAPACITY[rooms][0]);

    if (item.value === ROOMS_TO_CAPACITY[rooms][0]) {
      item.selected = true;
    }
    item.disabled = !ROOMS_TO_CAPACITY[rooms].includes(`${item.value}`);
  });
};

adRooms.addEventListener('change', (evt) => {
  switchGuestsCapacity(evt.target.value);
});

adRooms.addEventListener('invalid', onElementInvalid);
adRooms.addEventListener('change', onElementChange);
adCapacity.addEventListener('invalid', onElementInvalid);
adCapacity.addEventListener('change', onElementChange);

//time in && time out
adTimeIn.addEventListener('change', () => {
  adTimeOut.value = adTimeIn.value;
});

adTimeOut.addEventListener('change', () => {
  adTimeIn.value = adTimeOut.value;
});

//submit validity
const onFormValidityCheck = (evt) => {
  evt.preventDefault();

  if (!adTitle.reportValidity()) {
    adTitle.classList.add('ad-form__element-error');
  }

  if (!adPrice.reportValidity()) {
    adPrice.classList.add('ad-form__element-error');
  }

};

adForm.addEventListener('submit', onFormValidityCheck);
