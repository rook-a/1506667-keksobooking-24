const addPageDisabled = (isDisabled) => {
  const form = document.querySelector('.ad-form');
  const formElements = form.children;
  const filter = document.querySelector('.map__filters');
  const filterElements = filter.children;

  if (isDisabled) {
    form.classList.add('ad-form--disabled');
    filter.classList.add('map__filters--disabled');

    for (let i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', 'disabled');
    }

    for (let i = 0; i < filterElements.length; i++) {
      filterElements[i].setAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.remove('ad-form--disabled');
    filter.classList.remove('map__filters--disabled');

    for (let i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }

    for (let i = 0; i < filterElements.length; i++) {
      filterElements[i].removeAttribute('disabled');
    }
  }
};

addPageDisabled(true);

export {addPageDisabled};
