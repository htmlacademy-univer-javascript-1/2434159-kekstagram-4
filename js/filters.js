import { drawPictures, thumbnailsDelete } from './mini-photos.js';
import { shuffle, debounce } from './utils.js';
import { ACTIVE_FILTER_CLASS, MAX_COUNT_DISCUSSES_CARD, Filter } from './data.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let thumbnails = null;
let activeFilter = Filter.DEFAULT;

const filterFinction = {
  [Filter.DEFAULT]: () => thumbnails.slice(),
  [Filter.RANDOM]: () => shuffle(thumbnails.slice()).slice(0, MAX_COUNT_DISCUSSES_CARD),
  [Filter.DISCUSSED]: () => thumbnails.slice().sort((first, second) => second.comments.length - first.comments.length)
};

const onFiltersFormClick = (evt) =>{
  const id = evt.target.id;
  if(id !== activeFilter)
  {
    filtersForm.querySelector(`#${activeFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    activeFilter = id;
    thumbnailsDelete();
    drawPictures(filterFinction[id]());
  }
};

export const initFilters = (data) =>{
  thumbnails = data.slice();
  filtersForm.addEventListener('click', debounce(onFiltersFormClick));
  drawPictures(thumbnails);
};
