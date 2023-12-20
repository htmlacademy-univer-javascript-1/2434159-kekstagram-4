import { isEscape } from './utils.js';
import { MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, Error} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay.hidden');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('#upload-submit');

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

function closeOverlay(){
  imageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', isEscape, closeOverlay);
  uploadInput.addEventListener('click', openOverlay);
  uploadInput.value = null;
  hashtagsField.textContent = '';
  descriptionField.textContent = '';
}

function openOverlay() {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', isEscape, closeOverlay);
  uploadInput.removeEventListener('click', openOverlay);
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
