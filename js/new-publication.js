import { isEscape } from './utils.js';
import { MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, Error} from './data.js';
import { initEffect, resetEffect } from './effect.js';
import { resetScale } from './scaling.js';
import { onSuccess, onError } from './new-publication-send.js';
import { uploadData } from './fetch.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');

const effectsPreview = uploadForm.querySelectorAll('.effects__preview');
const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

const validationForm = /^#[0-9a-zа-яё]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUniqueness = (value) => {
  const hashtags = value.split(' ');
  const hashTagMap = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag in hashTagMap) {
      return false;
    }
    hashTagMap[hashtag] = true;
  }
  return true;
};

const validHashtages = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; ++i) {
    if (!validationForm.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  Error.BAD_HASHTAG_LENGTH
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUniqueness,
  Error.DUPLICATE_HASGTAG
);

pristine.addValidator(
  hashtagsField,
  validHashtages,
  Error.BAD_HASHTAG
);

const validateDescription = (value) => value.trim().length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionField,
  validateDescription,
  Error.BAD_DESCRIPTION_LENGTH
);

const changePicture = () => {
  const picture = uploadInput.files[0];
  imgUploadPreview.src = URL.createObjectURL(picture);
  effectsPreview.forEach((effect) => {
    effect.style.backgroundImage = `url('${imgUploadPreview.src}')`;
  });
};

export function closeOverlay(){
  resetEffect();
  resetScale();
  pristine.reset();
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = null;
  uploadForm.reset();
  submitBtn.removeAttribute('disabled', true);
}

export function onDocumentKeydown (evt) {
  if(isEscape(evt) && !document.querySelector('.error')){
    evt.preventDefault();
    closeOverlay();
  }
}

function openOverlay() {
  initEffect();
  changePicture();
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadInput.addEventListener('change', openOverlay);

hashtagsField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled', isValid);
  }
});

descriptionField.addEventListener('input', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    submitBtn.setAttribute('disabled', true);
  }
  else{
    submitBtn.removeAttribute('disabled', isValid);
  }

});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadData(onSuccess, onError, formData);
});

