const mapContainer = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const types = document.querySelector('#type').children;

const adTemplate = (obj) => {
  const fragment = document.createDocumentFragment();
  const popupElement = popupTemplate.cloneNode(true);

  const avatar = popupElement.querySelector('.popup__avatar');
  const title = popupElement.querySelector('.popup__title');
  const address = popupElement.querySelector('.popup__text--address');
  const price = popupElement.querySelector('.popup__text--price');
  const type = popupElement.querySelector('.popup__type');
  const capacity = popupElement.querySelector('.popup__text--capacity');
  const time = popupElement.querySelector('.popup__text--time');
  const featureContainer = popupElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  const modifiers = obj.offer.features.map((item) => `popup__feature--${item}`);

  const description = popupElement.querySelector('.popup__description');
  const photos = popupElement.querySelector('.popup__photos');
  const photo = popupElement.querySelector('.popup__photo');


  const checked = (objValue, element) => (objValue.length === 0) ? element.remove() : element.textContent = objValue;

  checked(obj.offer.title, title);
  checked(obj.offer.address, address);
  checked(obj.offer.description, description);

  //price
  if (obj.offer.price === 0) {
    price.remove();
  } else {
    price.textContent = `${obj.offer.price} ₽/ночь`;
  }

  //capacity
  if (obj.offer.capacity === 0) {
    capacity.remove();
  } else {
    capacity.textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  }

  //time
  if (obj.offer.time === 0) {
    time.remove();
  } else {
    time.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  }

  //type
  if (obj.offer.type === 0) {
    type.remove();
  } else {
    for (let i = 0; i < types.length; i++) {
      if (types[i].value === obj.offer.type) {
        type.textContent = types[i].textContent;
      }
    }
  }

  //avatar
  if (obj.offer.avatar === 0) {
    avatar.remove();
  } else {
    avatar.src = obj.author.avatar; //NaN в номере
  }

  //features
  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  //photos
  if (obj.offer.photos.length === 0) {
    photos.remove();
  } else {
    obj.offer.photos.forEach((item, index) => {
      if (index > 0) {
        const newPhoto = photo.cloneNode(true);

        newPhoto.src = item;
        photos.appendChild(newPhoto);
      } else {
        photo.src = item;
      }
    });
  }

  fragment.appendChild(popupElement);

  return  mapContainer.appendChild(fragment);
};

export {adTemplate};
