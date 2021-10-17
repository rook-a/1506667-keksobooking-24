import {createAd} from './create-ad.js';
import {adTemplate} from './ad-template.js';
import {addPageDisabled} from './add-page-disabled.js';

adTemplate(createAd(0));
addPageDisabled(true); // true - да / false или ничего - нет

//для тестов добавить AVATAR_COUNTS в импорт
/*
const test = AVATAR_COUNTS.map((item, index) => createAd(index));
console.log(test);
*/
