import {AVATAR_COUNTS} from './create-ad.js';

const addZero = (count) => count > 0 && count < AVATAR_COUNTS.length ? `0${count}` : count;

export {addZero};
