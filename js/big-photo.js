const commentsTemplate = document.querySelector('.social__comment');
document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

const loadComments = (commentsContainer, comments) => {
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; ++i) {
    const comment = commentsTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
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
  const openedPhoto = document.querySelector('.big-picture');
  openedPhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  openedPhoto.querySelector('.big-picture__img img').src = url;
  openedPhoto.querySelector('.likes-count').textContent = likes;
  openedPhoto.querySelector('.comments-count').textContent = comments.length;
  openedPhoto.querySelector('.social__caption').textContent = description;
  openedPhoto.querySelector('.loaded_comments').textContent = comments.length;
  const commentsContainer = document.querySelector('.social__comments');
  loadComments(commentsContainer, comments);
  document.addEventListener('keydown', onDocumentKeydown);
  openedPhoto.querySelector('.big-picture__cancel').addEventListener('click', closePhoto);
}

function closePhoto(evt) {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  evt.target.removeEventListener('click', closePhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export { openPhoto };
