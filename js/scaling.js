import {SCALE, SCALE_STEP, DEFAULT_SCALE} from './data.js';

const modalElement = document.querySelector('.img-upload');
const smallerButtonElement = modalElement.querySelector('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerBtnClick = () => scaleImage(Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, SCALE.MIN));

const onBiggerBtnClick = () => scaleImage(Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, SCALE.MAX));

const resetScale = () => {scaleImage(DEFAULT_SCALE);
};

smallerButtonElement.addEventListener('click', onSmallerBtnClick);
biggerButtonElement.addEventListener('click', onBiggerBtnClick);

export {resetScale};
