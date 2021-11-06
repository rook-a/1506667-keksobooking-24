const popupTemplateContainer = document.querySelector('#card').content.querySelector('.popup');
const typesContainer = document.querySelector('#type').children;

const adTemplate = (obj) => {
  const fragment = document.createDocumentFragment();
  const popupElement = popupTemplateContainer.cloneNode(true);

  const avatarContainer = popupElement.querySelector('.popup__avatar');
  const titleContainer = popupElement.querySelector('.popup__title');
  const addressContainer = popupElement.querySelector('.popup__text--address');
  const priceContainer = popupElement.querySelector('.popup__text--price');
  const typeContainer = popupElement.querySelector('.popup__type');
  const capacityContainer = popupElement.querySelector('.popup__text--capacity');
  const timeContainer = popupElement.querySelector('.popup__text--time');
  const featureContainer = popupElement.querySelector('.popup__features');
  const featureListContainer = featureContainer.querySelectorAll('.popup__feature');

  const descriptionContainer = popupElement.querySelector('.popup__description');
  const photosContainer = popupElement.querySelector('.popup__photos');
  const photoContainer = popupElement.querySelector('.popup__photo');


  const checked = (objValue, element) => (!objValue) ? element.remove() : element.textContent = objValue;

  checked(obj.offer.title, titleContainer);
  checked(obj.offer.address, addressContainer);
  checked(obj.offer.description, descriptionContainer);

  //price
  if (obj.offer.price === 0) {
    priceContainer.remove();
  } else {
    priceContainer.textContent = `${obj.offer.price} ₽/ночь`;
  }

  //capacity
  if (obj.offer.capacity === 0) {
    capacityContainer.remove();
  } else {
    capacityContainer.textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  }

  //time
  if (obj.offer.time === 0) {
    timeContainer.remove();
  } else {
    timeContainer.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  }

  //type
  if (obj.offer.type === 0) {
    typeContainer.remove();
  } else {
    for (let i = 0; i < typesContainer.length; i++) {
      if (typesContainer[i].value === obj.offer.type) {
        typeContainer.textContent = typesContainer[i].textContent;
      }
    }
  }

  //avatar
  avatarContainer.onerror = () => {
    avatarContainer.remove();
  };

  if (obj.offer.avatar === 0) {
    avatarContainer.remove();
  } else {
    avatarContainer.src = obj.author.avatar;
  }

  //features
  if (!obj.offer.features) {
    featureContainer.remove();
  } else {
    const modifiers = obj.offer.features.map((item) => `popup__feature--${item}`);

    featureListContainer.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  }

  //photos
  if (!obj.offer.photos) {
    photosContainer.remove();
  } else {
    obj.offer.photos.forEach((item, index) => {
      if (index > 0) {
        const newPhoto = photoContainer.cloneNode(true);

        newPhoto.src = item;
        photosContainer.appendChild(newPhoto);
      } else {
        photoContainer.src = item;
      }
    });
  }

  return fragment.appendChild(popupElement);
};

export {adTemplate};
