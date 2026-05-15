import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (query === '') {
    return iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: '#fafafb',
          iconColor: '#fafafb',
          progressBarColor: '#b51b1b',
          maxWidth: 432,
        });
      } else {
        createGallery(data.hits);
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      event.target.reset();
    });
});
