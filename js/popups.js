const addDataErrorPopup = (errText) => {
  const mapFilters = document.querySelector('.map__filters-container');
  const dataErrorPopup = document.querySelector('.error-data');
  const errorDataText = dataErrorPopup.querySelector('.error-data__text');
  const errorBtn = dataErrorPopup.querySelector('.error-data__button');

  mapFilters.insertAdjacentElement('beforebegin', dataErrorPopup);

  errorDataText.textContent = `${errText}`;
  dataErrorPopup.classList.remove('hidden');

  errorBtn.addEventListener('click', () => {
    dataErrorPopup.classList.add('hidden');
  }, { once: true });
};

const addPopup = (name) => {
  const pageBody = document.querySelector('.body');
  const template = document.querySelector(`#${name}`).content.querySelector(`.${name}`);

  const templateFragment = document.createDocumentFragment();
  const templateElement = template.cloneNode(true);

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
    const templateBtn = templateElement.querySelector('.error__button');

    templateBtn.addEventListener('click', onKeyClick, {once: true});
  }

  templateFragment.appendChild(templateElement);
  pageBody.appendChild(templateFragment);
};

export {addDataErrorPopup};
export {addPopup};
