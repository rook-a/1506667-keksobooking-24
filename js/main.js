const getRandomNumber = function (from, to) {
  from = Math.ceil(from); //MDN
  to = Math.floor(to); //MDN

  if (from === to || to < 0) {
    return false;
  }

  return Math.round(Math.random() * (to - from) + from); //MDN
};

const getRandomNumberDot = function (from, to, count) {
  if (from === to || to < 0) {
    return false;
  }

  const randomNumber = Math.random() * (to - from) + from;

  return randomNumber.toFixed(count);
};

getRandomNumber();
getRandomNumberDot();

// строки 2, 3, 9 взяты тут https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
