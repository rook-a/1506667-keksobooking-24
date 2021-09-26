const getRandomNumber = function (from, to) {
  from = Math.ceil(from); //MDN
  to = Math.floor(to); //MDN

  return (from >= 0 && to > from) ? Math.round(Math.random() * (to - from) + from) : false;
};

const getRandomNumberDot = function (from, to, count) {

  const randomNumber = Math.random() * (to - from) + from;

  return (from >= 0 && to > from && count > 0) ? Number(randomNumber.toFixed(count)) : false;
};

getRandomNumber();
getRandomNumberDot();

/* строки 2, 3, 5, 10 взяты тут https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  from = Math.ceil(from); //MDN
  to = Math.floor(to)
  Math.round(Math.random() * (to - from) + from)
*/
