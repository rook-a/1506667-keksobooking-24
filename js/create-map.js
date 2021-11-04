import {addPageDisabled} from './add-disabled.js';
import {addFilterDisabled} from './add-disabled.js';
import {adTemplate} from './template-ad.js';

const TOKYO_CENTER_LAT = 35.6895;
const TOKYO_CENTER_LNG = 139.6917;

const MAIN_PIN_SIZE_WIDTH = 52;
const MAIN_PIN_SIZE_HEIGHT = 52;
const MAIN_PIN_ANCHOR_WIDTH = 26;
const MAIN_PIN_ANCHOR_HEIGHT = 52;

const DEFAULT_PIN_SIZE_WIDTH = 40;
const DEFAULT_PIN_SIZE_HEIGHT = 40;
const DEFAULT_PIN_ANCHOR_WIDTH = 20;
const DEFAULT_PIN_ANCHOR_HEIGHT = 40;

const address = document.querySelector('#address');

address.value = `${TOKYO_CENTER_LAT}, ${TOKYO_CENTER_LNG}`;

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    addPageDisabled(false);
    addFilterDisabled(false);
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
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: './../img/main-pin.svg',
  iconSize: [MAIN_PIN_SIZE_WIDTH, MAIN_PIN_SIZE_HEIGHT],
  iconAnchor: [MAIN_PIN_ANCHOR_WIDTH, MAIN_PIN_ANCHOR_HEIGHT],
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

mainPin.addTo(mapCanvas);

mainPin.on('moveend', (evt) => {
  const location = evt.target.getLatLng();

  address.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
});

const defaultPinIcon = L.icon({
  iconUrl: './../img/pin.svg',
  iconSize: [DEFAULT_PIN_SIZE_WIDTH, DEFAULT_PIN_SIZE_HEIGHT],
  iconAnchor: [DEFAULT_PIN_ANCHOR_WIDTH, DEFAULT_PIN_ANCHOR_HEIGHT],
});

const pinGroup = L.layerGroup().addTo(mapCanvas);

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

const resetMap = () => {
  mainPin.setLatLng({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  });

  mapCanvas.setView({
    lat: TOKYO_CENTER_LAT,
    lng: TOKYO_CENTER_LNG,
  }, 12);

  mapCanvas.closePopup();
};

export {createCustomAd};
export {resetMap};
export {pinGroup};
