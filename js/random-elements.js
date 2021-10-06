const getRandomNumber = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);

  return (from >= 0 && to > from) ? Math.round(Math.random() * (to - from) + from) : false;
};

const getRandomNumberDot = (from, to, count = 0) => {

  const randomNumber = Math.random() * (to - from) + from;

  return (from >= 0 && to > from && count >= 0) ? Number(randomNumber.toFixed(count)) : false;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArrayString = (arr) => {
  const strings = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    if (getRandomNumber(0, 1) > 0) {
      strings.push(arr[i]);
    }
  }

  return strings;
};

export {getRandomNumber};
export {getRandomNumberDot};
export {getRandomArrayElement};
export {getRandomArrayString};
