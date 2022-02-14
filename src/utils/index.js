const objectIsEmpty = (object) => {
  const length = Object.keys(object).length;

  if (length === 0) return true;
  return false;
};

module.exports = {
  objectIsEmpty,
};
