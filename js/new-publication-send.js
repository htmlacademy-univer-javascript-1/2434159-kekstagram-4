import { isEscape } from './utils.js';
import { closeOverlay } from './new-publication.js';
import { MESSAGE_STATUS_Z_INDEX } from './data.js';

const body = document.body;

const successMessageTemplate = body.querySelector('#success').content.querySelector('section');
const failMessageTemplate = body.querySelector('#error').content.querySelector('section');

const onBodyClick = (evt) => {
  const clickTarget = evt.target;
  if(!clickTarget.classList.contains('success__inner') && !clickTarget.classList.contains('error__inner')){
    closeMessage();
  }
};

const onBodyKeyDown = (evt) => {
  if (isEscape(evt)) {
    closeMessage();
  }
};

function closeMessage () {
  body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onBodyKeyDown);
  body.lastChild.remove();
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(1);
  message.style.zIndex = MESSAGE_STATUS_Z_INDEX;
  document.addEventListener('keydown', onBodyKeyDown);
  body.addEventListener('click', onBodyClick);
  body.append(message);
};

export const onSuccess = () => {
  closeOverlay();
  showMessage(successMessageTemplate);
};

export const onError = () => {
  showMessage(failMessageTemplate);
};

