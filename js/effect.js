const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainer = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

const EffectName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [EffectName.CHROME]: {
    style: 'grayscale',
    unit: '',},
  [EffectName.SEPIA]: {
    style: 'sepia',
    unit: '',},
  [EffectName.MARVIN]: {
    style: 'invert',
    unit: '%',},
  [EffectName.HEAT]: {
    style: 'brightness',
    unit: '',},
  [EffectName.PHOBOS]: {
    style: 'blur',
    unit: 'px',},
};

const effectToSlider = {
  [EffectName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,},
  [EffectName.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,},
  [EffectName.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,},
  [EffectName.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,},
  [EffectName.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,},
  [EffectName.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,},
};

let chosenEffect = EffectName.DEFAULT;

const isDefault = () => chosenEffect === EffectName.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }
  const {value} = effectLevelElement;
  const {style, unit} = effectToFilter[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpd = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const showSlider = () => sliderContainer.classList.remove('hidden');

const hideSlider = () => sliderContainer.classList.add('hidden');

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpd);
  hideSlider();
};

const updSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updSlider(effectToSlider[chosenEffect]);
    showSlider();
  }
};

const setEffect = (result) => {
  chosenEffect = result;
  setSlider();
  setImageStyle();
};

const resetEffect = () => setEffect(EffectName.DEFAULT);

const onEffectsChange = (evt) => setEffect(evt.target.value);

let sliderCreated = false;

const initEffect = () => {
  if (!sliderCreated) {
    createSlider(effectToSlider[chosenEffect]);
    sliderCreated = true;
    effectsElement.addEventListener('change', onEffectsChange);
  }
};

export {resetEffect, initEffect};
