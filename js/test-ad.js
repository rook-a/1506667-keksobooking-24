import {createAd, AVATAR_COUNTS} from './create-ad.js';

const mapContainer = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const types = document.querySelector('#type').children;

const similarAds = createAd();
const createIndex = AVATAR_COUNTS.map((item, index) => createAd(index));

const popupElement = popupTemplate.cloneNode(true);
const featureContainer = popupElement.querySelector('.popup__features');
const featureList = featureContainer.querySelectorAll('.popup__feature');
const modifiers = similarAds.offer.features.map((item) => `popup__feature--${item}`);

popupElement.querySelector('.popup__title').textContent = similarAds.offer.title;
popupElement.querySelector('.popup__text--address').textContent = similarAds.offer.address;
popupElement.querySelector('.popup__text--price').textContent = `${similarAds.offer.price} ₽/ночь`;
popupElement.querySelector('.popup__text--capacity').textContent = `${similarAds.offer.rooms} комнаты для ${similarAds.offer.guests} гостей`;
popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarAds.offer.checkin}, выезд до ${similarAds.offer.checkout}`;
popupElement.querySelector('.popup__description').textContent = similarAds.offer.description;

//types houses
for (let i = 0; i < types.length; i++) {
  if (types[i].value === similarAds.offer.type) {
    popupElement.querySelector('.popup__type').textContent = types[i].textContent;
  }
}

//avatar
//возвращается последняя. логично, но не порядок -_-
//popupElement.querySelector('.popup__avatar').src = similarAds.author.avatar; //NaN в номере
createIndex.forEach((item) => {
  popupElement.querySelector('.popup__avatar').src = item.author.avatar;
});

//features
featureList.forEach((featureListItem) => {
  const modifier = featureListItem.classList[1];

  if (!modifiers.includes(modifier)) {
    featureListItem.remove();
  }
});

//photos
if (similarAds.offer.photos.length === 0) {
  popupElement.querySelector('.popup__photos').remove();
}

similarAds.offer.photos.forEach((item, index) => {
  const photos = popupElement.querySelector('.popup__photos');
  const photo = popupElement.querySelector('.popup__photo');

  if (index > 0) {
    const newPhoto = photo.cloneNode(true);

    newPhoto.src = item;
    photos.appendChild(newPhoto);
  } else {
    photo.src = item;
  }
});

mapContainer.appendChild(popupElement);
