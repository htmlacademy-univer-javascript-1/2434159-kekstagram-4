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

const MAX_HASHTAGS_COUNT = 140;

const MAX_DESCRIPTION_LENGTH = 140;

const PHOTOS_COUNT = 25;

const COMMENT_STEP = 5;

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

const SCALE = {
  MIN: 25,
  MAX: 100
};

const SCALE_STEP = 25;

const DEFAULT_SCALE = 100;

export const Error = {BAD_HASHTAG_LENGTH: 'Максимальное кол-во хэштегов: 5', DUPLICATE_HASGTAG: 'Хэштеги не должны повторяться', BAD_HASHTAG: 'Ошибка в хэштеге', BAD_DESCRIPTION_LENGTH: 'Максимальная длина описания - 140'};

export {NAMES, MESSAGES, PHOTOS_COUNT, IdNumber, LikesCount, CommentsCount, AvatarNumber, COMMENT_STEP, MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, SCALE, SCALE_STEP, DEFAULT_SCALE};
