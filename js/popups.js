const addDataErrorPopup = (errText) => {
  const mapContainer = document.querySelector('.map');
  const dataErrorTemplate = document.querySelector('#error-data').content.querySelector('.error-data');
  const errorDataText = dataErrorTemplate.querySelector('.error-data__text');
  const errorBtn = dataErrorTemplate.querySelector('.error-data__button');

  mapContainer.appendChild(dataErrorTemplate);

  dataErrorTemplate.classList.remove('hidden');
  errorDataText.textContent = `${errText}`;

  errorBtn.addEventListener('click', () => {
    dataErrorTemplate.classList.add('hidden');
  });
};

const addPopup = (name) => {
  const pageBody = document.querySelector('.body');
  const template = document.querySelector(`#${name}`).content.querySelector(`.${name}`);

  pageBody.appendChild(template);

  document.addEventListener('click', () => {
    template.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      template.classList.add('hidden');
    }
  });

  if (name === 'error') {
    const templateBtn = template.querySelector('.error__button');

    templateBtn.addEventListener('click', () => {
      template.classList.add('hidden');
    });
  }
};

export {addDataErrorPopup};
export {addPopup};
