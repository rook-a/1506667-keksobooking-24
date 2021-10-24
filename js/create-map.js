import {addPageDisabled} from './add-page-disabled.js';
import {AVATAR_COUNTS} from './create-ad.js';
import {createAd} from './create-ad.js';
import {adTemplate} from './template-ad.js';

const address = document.querySelector('#address');

const TOKYO_CENTER_LAT = 35.6895;
const TOKYO_CENTER_LNG = 139.6917;

address.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

const map = L.map('map-canvas')
  .on('load', () => {
    addPageDisabled(false);
  })
  .setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  {
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

mainPin.on('moveend', (evt) => {
  const location = evt.target.getLatLng();

  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
});

const defaultPinIcon = L.icon({
  iconUrl: './../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pinGroup = L.layerGroup().addTo(map);

const createCustomAd = (item) => {
  const {location} = item;
  const lat = location.lat;
  const lng = location.lng;
  const defaultPins = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: defaultPinIcon,
    },
  );

  defaultPins.addTo(pinGroup).bindPopup(adTemplate(item));
};

AVATAR_COUNTS.forEach((item, index) => {
  createCustomAd(createAd(index));
});
