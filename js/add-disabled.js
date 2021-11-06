const addFilterDisabled = (isDisabled) => {
  const filterContainer = document.querySelector('.map__filters');
  const filterElementsContainer = filterContainer.children;

  if (isDisabled) {
    filterContainer.classList.add('map__filters--disabled');

    for (let i = 0; i < filterElementsContainer.length; i++) {
      filterElementsContainer[i].setAttribute('disabled', 'disabled');
    }
  } else {
    filterContainer.classList.remove('map__filters--disabled');

    for (let i = 0; i < filterElementsContainer.length; i++) {
      filterElementsContainer[i].removeAttribute('disabled');
    }
  }
};

const addPageDisabled = (isDisabled) => {
  const formContainer = document.querySelector('.ad-form');
  const formElementsContainer = formContainer.children;

  if (isDisabled) {
    formContainer.classList.add('ad-form--disabled');

    for (let i = 0; i < formElementsContainer.length; i++) {
      formElementsContainer[i].setAttribute('disabled', 'disabled');
    }
  } else {
    formContainer.classList.remove('ad-form--disabled');

    for (let i = 0; i < formElementsContainer.length; i++) {
      formElementsContainer[i].removeAttribute('disabled');
    }
  }
};

addPageDisabled(true);
addFilterDisabled(true);

export {addPageDisabled};
export {addFilterDisabled};
