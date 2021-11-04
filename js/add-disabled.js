const addFilterDisabled = (isDisabled) => {
  const filter = document.querySelector('.map__filters');
  const filterElements = filter.children;

  if (isDisabled) {
    filter.classList.add('map__filters--disabled');

    for (let i = 0; i < filterElements.length; i++) {
      filterElements[i].setAttribute('disabled', 'disabled');
    }
  } else {
    filter.classList.remove('map__filters--disabled');

    for (let i = 0; i < filterElements.length; i++) {
      filterElements[i].removeAttribute('disabled');
    }
  }
};

const addPageDisabled = (isDisabled) => {
  const form = document.querySelector('.ad-form');
  const formElements = form.children;

  if (isDisabled) {
    form.classList.add('ad-form--disabled');

    for (let i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.remove('ad-form--disabled');

    for (let i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  }
};

addPageDisabled(true);
addFilterDisabled(true);

export {addPageDisabled};
export {addFilterDisabled};
