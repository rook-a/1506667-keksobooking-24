import {createAd} from './create-ad.js';
import {adTemplate} from './ad-template.js';
import {addPageDisabled} from './addPageDisabled.js';

adTemplate(createAd());
addPageDisabled(); // 1 - да / 0 или ничего - нет

//для тестов добавить AVATAR_COUNTS в импорт
/*
const test = AVATAR_COUNTS.map((item, index) => createAd(index));
console.log(test);
*/
