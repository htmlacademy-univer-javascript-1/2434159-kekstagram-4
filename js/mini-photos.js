export const drawPictures = (photos) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const thumbnails = document.querySelector('.pictures');

  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, likes, description, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosListFragment.append(photoElement);
  });

  thumbnails.append(photosListFragment);
};
