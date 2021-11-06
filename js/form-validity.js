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
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const adFormContainer = document.querySelector('.ad-form');
const adTitleContainer = adFormContainer.querySelector('#title');
const adPriceContainer = adFormContainer.querySelector('#price');
const adTypesContainer = adFormContainer.querySelector('#type');
const adRoomsContainer = adFormContainer.querySelector('#room-number');
const adCapacityContainer = adFormContainer.querySelector('#capacity');
const adCapacityOptionContainer = Array.from(adCapacityContainer.children);
const adTimeInContainer = adFormContainer.querySelector('#timein');
const adTimeOutContainer = adFormContainer.querySelector('#timeout');

//title
adTitleContainer.addEventListener('invalid', () => {
  const valueLength = adTitleContainer.value.length;

  if (adTitleContainer.validity.valueMissing) {
    adTitleContainer.classList.add('ad-form__element-error');
    adTitleContainer.setCustomValidity('Обязательное поле');
    return;
  }

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitleContainer.classList.add('ad-form__element-error');
    adTitleContainer.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    return;
  }

  if (valueLength > MAX_TITLE_LENGTH) {
    adTitleContainer.classList.add('ad-form__element-error');
    adTitleContainer.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
    return;
  }
  adTitleContainer.classList.remove('ad-form__element-error');
  adTitleContainer.setCustomValidity('');
});

adTitleContainer.addEventListener('input', () => {
  adTitleContainer.reportValidity();
});

//price
adPriceContainer.addEventListener('invalid', () => {
  if (adPriceContainer.validity.valueMissing) {
    adPriceContainer.classList.add('ad-form__element-error');
    adPriceContainer.setCustomValidity('Обязательное поле');
    return;
  }

  if (Number(adPriceContainer.value) > MAX_PRICE_VALUE) {
    adPriceContainer.classList.add('ad-form__element-error');
    adPriceContainer.setCustomValidity(`Слишком высокая цена за ночь. Уменьшите цену на ${adPriceContainer.value - MAX_PRICE_VALUE} руб.`);
    return;
  }

  if (Number(adPriceContainer.value) < Number(adPriceContainer.min)) {
    adPriceContainer.classList.add('ad-form__element-error');
    adPriceContainer.setCustomValidity(`Цена за ночь меньше допустимой. Увеличьте цену на ${adPriceContainer.min - adPriceContainer.value} руб.`);
    return;
  }

  adPriceContainer.setCustomValidity('');
  adPriceContainer.classList.remove('ad-form__element-error');
});

adPriceContainer.addEventListener('input', () => {
  adPriceContainer.reportValidity();
});

//type
const onPriceChange = () => {
  adPriceContainer.placeholder = PRICE_TO_TYPE[adTypesContainer.value];
  adPriceContainer.setAttribute('min', PRICE_TO_TYPE[adTypesContainer.value]);
};

adTypesContainer.addEventListener('change', onPriceChange);

//adRooms && adCapacity
const onElementInvalid = () => {
  if (adRoomsContainer.value >= adCapacityContainer.value) {
    adRoomsContainer.setCustomValidity('');
  } else {
    adRoomsContainer.setCustomValidity('Комнат не хватает!');
  }

  if (adRoomsContainer.value < adCapacityContainer.value) {
    adRoomsContainer.setCustomValidity('Нужно больше комнат!');
  } else {
    adRoomsContainer.setCustomValidity('');
  }
};

const switchGuestsCapacity = (rooms) => {
  if (adRoomsContainer.value >= adCapacityContainer.value) {
    adRoomsContainer.setCustomValidity('');
  } else {
    adRoomsContainer.setCustomValidity('Комнат не хватает!');
  }

  if (adRoomsContainer.value < adCapacityContainer.value) {
    adRoomsContainer.setCustomValidity('Нужно больше комнат!');
  } else {
    adRoomsContainer.setCustomValidity('');
  }

  adCapacityOptionContainer.forEach((item) => {
    item.disabled = !ROOMS_TO_CAPACITY[rooms].includes(item.value);
  });

  adRoomsContainer.reportValidity();
  adCapacityContainer.reportValidity();
};

adRoomsContainer.addEventListener('change', (evt) => {
  switchGuestsCapacity(evt.target.value);
});

adCapacityContainer.addEventListener('change', (evt) => {
  switchGuestsCapacity(evt.target.value);
});

adRoomsContainer.addEventListener('invalid', onElementInvalid);
adCapacityContainer.addEventListener('invalid', onElementInvalid);

//time in && time out
adTimeInContainer.addEventListener('change', () => {
  adTimeOutContainer.value = adTimeInContainer.value;
});

adTimeOutContainer.addEventListener('change', () => {
  adTimeInContainer.value = adTimeOutContainer.value;
});

//submit validity
const onFormValidityCheck = (evt) => {
  if (!adTitleContainer.reportValidity()) {
    evt.preventDefault();
    adTitleContainer.classList.add('ad-form__element-error');
  }

  if (!adPriceContainer.reportValidity()) {
    evt.preventDefault();
    adPriceContainer.classList.add('ad-form__element-error');
  }

};

adFormContainer.addEventListener('submit', onFormValidityCheck);

export {onPriceChange};
