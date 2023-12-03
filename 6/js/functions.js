const checkStrokeLength = (str, maxLength) => str.length <= maxLength;

const isPalindromeStr = (str) => {
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str.at(i) !== str.at(len - 1 - i)) {
      return false;
    }
  }
  return true;
};
