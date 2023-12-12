import { COMMENT_STEP } from './data.js';

const commentsTemplate = document.querySelector('.social__comment');
const bodyElement = document.body;
const commentsLoader = bodyElement.querySelector('.comments-loader');
const activeComments = document.querySelector('.loaded_comments');
const bigPhoto = document.querySelector('.big-picture');
const closeViewPopupBtn = document.querySelector('.big-picture__cancel');
const loadCommentsBtn = bigPhoto.querySelector('.social__comments-loader');

const renderMoreComments = () => {
  let currentComment = document.querySelector('.social__comment.hidden');
  let i = 0;
  for (let j = i; i < j + COMMENT_STEP; i++) {
    if (!currentComment) {
      commentsLoader.classList.add('hidden');
      break;
    }
    currentComment.classList.remove('hidden');
    currentComment = currentComment.nextElementSibling;
    if (!currentComment) {
      commentsLoader.classList.add('hidden');
      activeComments.textContent = +activeComments.textContent + 1;
      break;
    }
  }
  activeComments.textContent = +activeComments.textContent + i;
};

const onCloseBtnClick = () => closePhoto();

const onLoadCommentsBtn = () => renderMoreComments();

const loadComments = (commentsContainer, comments) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; ++i) {
    const comment = commentsTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
    comment.classList.add('hidden');
    commentsFragment.append(comment);
  }
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePhoto(evt);
  }
};

function openPhoto(url, description, likes, comments) {
  bigPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPhoto.querySelector('.big-picture__img img').src = url;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.comments-count').textContent = comments.length;
  bigPhoto.querySelector('.social__caption').textContent = description;
  activeComments.textContent = '0';
  const commentsContainer = document.querySelector('.social__comments');

  loadComments(commentsContainer, comments);

  commentsLoader.classList.remove('hidden');
  renderMoreComments();

  document.addEventListener('keydown', onDocumentKeydown);
  bigPhoto.querySelector('.big-picture__cancel').addEventListener('click', closePhoto);
  loadCommentsBtn.addEventListener('click', onLoadCommentsBtn);
  closeViewPopupBtn.addEventListener('click', onCloseBtnClick);
}

function closePhoto() {
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loadCommentsBtn.removeEventListener('click', onLoadCommentsBtn);
  bigPhoto.classList.add('hidden');
}

export { openPhoto };
