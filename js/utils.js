export const isEscape = (evt) => evt.key === 'Escape';

export const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
