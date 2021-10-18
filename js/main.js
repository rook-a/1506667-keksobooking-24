import {createAd} from './create-ad.js';
import {adTemplate} from './ad-template.js';
import {addPageDisabled} from './add-page-disabled.js';
import './form-validity.js';

adTemplate(createAd(0));
addPageDisabled(false); // true - да / false или ничего - нет

//для тестов добавить AVATAR_COUNTS в импорт
/*
const test = AVATAR_COUNTS.map((item, index) => createAd(index));
console.log(test);
*/
