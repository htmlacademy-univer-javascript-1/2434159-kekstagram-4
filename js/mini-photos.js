import { openPhoto } from './big-photo.js';
import { initFilters } from './filters.js';

const thumbnails = document.querySelector('.pictures');

export const drawPictures = (photos) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.addEventListener('click', () => {openPhoto(photo);});
    photosListFragment.append(photoElement);
  });

  thumbnails.append(photosListFragment);
};

export const thumbnailsDelete = () => {
  const thumbnailsToDelete = thumbnails.querySelectorAll('.picture');
  thumbnailsToDelete.forEach((thumbnail) => thumbnail.remove());
};

export const onError = () => {
  const errorMesage = document.createElement('p');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '40px';
  errorMesage.style.backgroundColor = 'red';
  errorMesage.style.padding = '30px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Не удалось загрузить данные.';
  document.body.append(errorMesage);
};

export const onSuccess = (data) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  drawPictures(data.slice());
  initFilters(data);
};
