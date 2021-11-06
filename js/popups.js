const addDataErrorPopup = (errText) => {
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  const dataErrorPopupContainer = document.querySelector('.error-data');
  const errorDataTextContainer = dataErrorPopupContainer.querySelector('.error-data__text');
  const errorBtnContainer = dataErrorPopupContainer.querySelector('.error-data__button');

  mapFiltersContainer.insertAdjacentElement('beforebegin', dataErrorPopupContainer);

  errorDataTextContainer.textContent = `${errText}`;
  dataErrorPopupContainer.classList.remove('hidden');

  errorBtnContainer.addEventListener('click', () => {
    dataErrorPopupContainer.classList.add('hidden');
  }, { once: true });
};

const addPopup = (name) => {
  const pageBodyContainer = document.querySelector('.body');
  const templateContainer = document.querySelector(`#${name}`).content.querySelector(`.${name}`);

  const templateFragment = document.createDocumentFragment();
  const templateElement = templateContainer.cloneNode(true);

  const onKeyClick = () => {
    templateElement.remove();

    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onKeyDown);
  };

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      templateElement.remove();
    }
    document.removeEventListener('click', onKeyClick);
  };

  document.addEventListener('click', onKeyClick, {once: true});

  document.addEventListener('keydown', onKeyDown, {once: true});

  if (name === 'error') {
    const templateBtnContainer = templateElement.querySelector('.error__button');

    templateBtnContainer.addEventListener('click', onKeyClick, {once: true});
  }

  templateFragment.appendChild(templateElement);
  pageBodyContainer.appendChild(templateFragment);
};

export {addDataErrorPopup};
export {addPopup};
