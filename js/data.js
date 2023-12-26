const MAX_HASHTAGS_COUNT = 140;

const MAX_DESCRIPTION_LENGTH = 140;

const PHOTOS_COUNT = 25;

const COMMENT_STEP = 5;

const MESSAGE_STATUS_Z_INDEX = 2;

const HIDDEN_CONTAINER_CLASS = 'img-filters--inactive';
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const MAX_COUNT_DISCUSSES_CARD = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SCALE = {
  MIN: 25,
  MAX: 100
};

const SCALE_STEP = 25;

const DEFAULT_SCALE = 100;

export const Error = {BAD_HASHTAG_LENGTH: 'Максимальное кол-во хэштегов: 5', DUPLICATE_HASGTAG: 'Хэштеги не должны повторяться', BAD_HASHTAG: 'Ошибка в хэштеге', BAD_DESCRIPTION_LENGTH: 'Максимальная длина описания - 140'};

export {Filter, HIDDEN_CONTAINER_CLASS, ACTIVE_FILTER_CLASS, MAX_COUNT_DISCUSSES_CARD, PHOTOS_COUNT, COMMENT_STEP, MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, SCALE, SCALE_STEP, DEFAULT_SCALE, MESSAGE_STATUS_Z_INDEX};
