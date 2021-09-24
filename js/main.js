const getRandomNumber = function (from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);

  if (from === to || to < 0) {
    return false;
  }

  return Math.round(Math.random() * (to - from) + from);
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
