const adForm = document.querySelector('.ad-form');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adTypes = adForm.querySelector('#type');
const adBtn = adForm.querySelector('.ad-form__submit');
const adRooms = adForm.querySelector('#room-number');
const adCapacity = adForm.querySelector('#capacity');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

//error style
const addErrorStyle = (isError, item) => {
  const styleError = 'box-shadow: 0 0 2px 2px #FF0000;';

  (isError) ? item.style = styleError : item.style = '';
};

//disabled submit btn
const disabledBtn = (isDisabled) => (isDisabled) ? adBtn.setAttribute('disabled', 'disabled') : adBtn.removeAttribute('disabled', 'disabled');

//title
adTitle.addEventListener('invalid', () => {
  if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
    addErrorStyle(true, adTitle);
    disabledBtn(true);
  } else if (adTitle.value.length < MIN_TITLE_LENGTH || adTitle.value.length > MAX_TITLE_LENGTH) {
    addErrorStyle(true, adTitle);
    disabledBtn(true);
  } else {
    adTitle.setCustomValidity('');
    addErrorStyle(false, adTitle);
  }
});

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    adTitle.setCustomValidity('');
    addErrorStyle(false, adTitle);
    disabledBtn(false);
  }

  adTitle.reportValidity();
});

//price
adPrice.addEventListener('invalid', () => {
  if (adPrice.validity.valueMissing) {
    adPrice.setCustomValidity('Обязательное поле');
    addErrorStyle(true, adPrice);
    disabledBtn(true);
  } else {
    adPrice.setCustomValidity('');
    addErrorStyle(false, adPrice);
    disabledBtn(false);
  }

  if (adPrice.value > MAX_PRICE_VALUE) {
    adPrice.setCustomValidity(`Слишком высокая цена за ночь. Уменьшите на ${adPrice.value - MAX_PRICE_VALUE} руб.`);
    addErrorStyle(true, adPrice);
    disabledBtn(true);
  } else {
    adPrice.setCustomValidity('');
    addErrorStyle(false, adPrice);
    disabledBtn(false);
  }
});

adPrice.addEventListener('input', () => {
  const priceValue = adPrice.value;

  if (priceValue > MAX_PRICE_VALUE) {
    //adPrice.setCustomValidity(`Слишком высокая цена за ночь. Уменьшите на ${priceValue - MAX_PRICE_VALUE} руб.`);
    addErrorStyle(true, adPrice);
    disabledBtn(true);
  } else {
    addErrorStyle(false, adPrice);
    disabledBtn(false);
  }

  adPrice.reportValidity();
});

//type
const onPriceChange = () => {

  if (adTypes.value === 'bungalow') {
    adPrice.placeholder = 0;
    adPrice.setAttribute('min', '0');
  }

  if (adTypes.value === 'flat') {
    adPrice.placeholder = 1000;
    adPrice.setAttribute('min', '1000');
  }

  if (adTypes.value === 'hotel') {
    adPrice.placeholder = 3000;
    adPrice.setAttribute('min', '3000');
  }

  if (adTypes.value === 'house') {
    adPrice.placeholder = 5000;
    adPrice.setAttribute('min', '5000');
  }

  if (adTypes.value === 'palace') {
    adPrice.placeholder = 10000;
    adPrice.setAttribute('min', '10000');
  }
};

adTypes.addEventListener('change', onPriceChange);

//adRooms && adCapacity
/*
const disabledCapacity = () => {
  switch (adRooms.value) {
    case '1':
      adCapacity[0].setAttribute('disabled', 'disabled');
      adCapacity[1].setAttribute('disabled', 'disabled');
      adCapacity[2].removeAttribute('disabled', 'disabled');
      adCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '2':
      adCapacity[0].setAttribute('disabled', 'disabled');
      adCapacity[1].removeAttribute('disabled', 'disabled');
      adCapacity[2].removeAttribute('disabled', 'disabled');
      adCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '3':
      adCapacity[0].removeAttribute('disabled', 'disabled');
      adCapacity[1].removeAttribute('disabled', 'disabled');
      adCapacity[2].removeAttribute('disabled', 'disabled');
      adCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '100':
      adCapacity[0].setAttribute('disabled', 'disabled');
      adCapacity[1].setAttribute('disabled', 'disabled');
      adCapacity[2].setAttribute('disabled', 'disabled');
      adCapacity[3].removeAttribute('disabled', 'disabled');
      break;
    default:
      adCapacity[0].removeAttribute('disabled', 'disabled');
      adCapacity[1].removeAttribute('disabled', 'disabled');
      adCapacity[2].removeAttribute('disabled', 'disabled');
      adCapacity[3].removeAttribute('disabled', 'disabled');
      break;
  }
};

adRooms.addEventListener('change', disabledCapacity);
*/

const onElementInvalid = () => {
  if (adRooms.value >= adCapacity.value) {
    adRooms.setCustomValidity('');
    addErrorStyle(false, adRooms);
    addErrorStyle(false, adCapacity);
    disabledBtn(false);
  } else {
    adRooms.setCustomValidity('Комнат не хватает!');
    addErrorStyle(true, adRooms);
    addErrorStyle(true, adCapacity);
    disabledBtn(true);
  }

  if (adRooms.value < adCapacity.value) {
    adRooms.setCustomValidity('Нужно больше комнат!');
    addErrorStyle(true, adRooms);
    addErrorStyle(true, adCapacity);
    disabledBtn(true);
  } else {
    adRooms.setCustomValidity('');
    addErrorStyle(false, adRooms);
    addErrorStyle(false, adCapacity);
    disabledBtn(false);
  }
};

const onElementChange = () => {
  if (adRooms.value >= adCapacity.value) {
    adRooms.setCustomValidity('');
    addErrorStyle(false, adRooms);
    addErrorStyle(false, adCapacity);
    disabledBtn(false);
  } else {
    adRooms.setCustomValidity('Комнат не хватает!');
    addErrorStyle(true, adRooms);
    addErrorStyle(true, adCapacity);
    disabledBtn(true);
  }

  if (adRooms.value < adCapacity.value) {
    adRooms.setCustomValidity('Нужно больше комнат!');
    addErrorStyle(true, adRooms);
    addErrorStyle(true, adCapacity);
    disabledBtn(true);
  } else {
    adRooms.setCustomValidity('');
    addErrorStyle(false, adRooms);
    addErrorStyle(false, adCapacity);
    disabledBtn(false);
  }

  if (adRooms.value === '100') {
    adCapacity.value = adCapacity[3].value;
    adCapacity[0].setAttribute('disabled', 'disabled');
    adCapacity[1].setAttribute('disabled', 'disabled');
    adCapacity[2].setAttribute('disabled', 'disabled');
    adCapacity[3].removeAttribute('disabled', 'disabled');
  } else {
    adCapacity[0].removeAttribute('disabled', 'disabled');
    adCapacity[1].removeAttribute('disabled', 'disabled');
    adCapacity[2].removeAttribute('disabled', 'disabled');
    adCapacity[3].setAttribute('disabled', 'disabled');
  }

  adRooms.reportValidity();
  adCapacity.reportValidity();
};

adRooms.addEventListener('invalid', onElementInvalid);
adRooms.addEventListener('change', onElementChange);
adCapacity.addEventListener('invalid', onElementInvalid);
adCapacity.addEventListener('change', onElementChange);

