const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomIdFromRange = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInt(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(min, max);
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

const NAMES = [
  'Viktor',
  'Sonya',
  'Nicola',
  'Olga',
  'Santiago'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTOS_COUNT = 25;

const IdNumber = {
  MIN: 1,
  MAX: 25
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const AvatarNumber = {
  MIN: 1,
  MAX: 6,
};

const usedId = [];
const getId = () => getUniqueRandomId(IdNumber.MIN,IdNumber.MAX,usedId);
const getLikes = () => getRandomInt(LikesCount.MIN, LikesCount.MAX);
const getComments = () => {
  const comments = [];
  const numComments = getRandomInt(CommentsCount.MIN, CommentsCount.MAX);
  for (let i = 0; i <= numComments - 1; i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInt(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
      message: MESSAGES[getRandomInt(0, MESSAGES.length-1)],
      name:NAMES[getRandomInt(0, NAMES.length-1)]
    };
    comments.push(comment);
  }

  return comments;
};

const generatePhotoDescription = () => {
  const id = getId();
  const photo = {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Посмотрите, какую фотографию я сделал!',
    likes: getLikes(),
    comments: getComments()
  };

  return photo;
};
const getPhotosCollection = () => Array.from({length:PHOTOS_COUNT}, generatePhotoDescription);
console.log(getPhotosCollection());
