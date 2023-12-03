export const drawPictures = (photosCollection) => {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const photosList = document.querySelector('.pictures');

  const photosListFragment = document.createDocumentFragment();

  photosCollection.forEach(({url, likes, description, comments}) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosListFragment.append(photoElement);
  });

  photosList.append(photosListFragment);
};
