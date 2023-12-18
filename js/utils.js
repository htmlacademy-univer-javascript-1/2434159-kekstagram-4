import {NAMES, MESSAGES, PHOTOS_COUNT, IdNumber, LikesCount, CommentsCount, AvatarNumber} from './data.js';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getUniqueRandomId = (min,max,array) => {
  const getRandomId = getRandomIdFromRange(min, max);
  let randomId = getRandomId();
  while (array.includes(randomId)) {
    randomId = getRandomId();
  }
  array.push(randomId);

  return randomId;
};

const usedId = [];
const getId = () => getUniqueRandomId(IdNumber.MIN,IdNumber.MAX,usedId);
const getLikes = () => getRandomInteger(LikesCount.MIN, LikesCount.MAX);
const getComments = () => {
  const comments = [];
  const numComments = getRandomInteger(CommentsCount.MIN, CommentsCount.MAX);
  for (let i = 0; i <= numComments - 1; i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGES.length-1)],
      name:NAMES[getRandomInteger(0, NAMES.length-1)]
    };
    comments.push(comment);
  }

  return comments;
};

const generatePhotoDescription = () => {
  const i = getId();
  const photo = {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'Посмотрите, какую фотографию я сделал!',
    likes: getLikes(),
    comments: getComments()
  };

  return photo;
};
export const getPhotosCollection = () => Array.from({length:PHOTOS_COUNT}, generatePhotoDescription);

export const onDocumentKeydown = (evt, closingFunc) => {
  if (evt.key === 'Escape') {
    closingFunc(evt);
  }
};
