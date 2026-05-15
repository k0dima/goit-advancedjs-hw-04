import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreBtn,
  showErrorToast,
  showLoadMoreBtn,
  showWarningToast,
} from './js/render-functions.js';
import refs from './js/refs.js';
import { calculateMaxPage } from './js/utils.js';

let currentPage = 1;
let maxPage = 1;
let query = '';
let lastPage = false;

refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  maxPage = 1;
  currentPage = 1;

  query = event.target.elements['search-text'].value.trim();

  if (query === '') {
    return showWarningToast('Please enter a search query!');
  }

  clearGallery();
  showLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(query, currentPage);

    if (data.hits.length === 0) {
      lastPage = true;

      showErrorToast(
        'Sorry, there are no images matching your search query. Please, try again!'
      );

      hideLoadMoreBtn();

      return;
    }

    maxPage = calculateMaxPage(data.totalHits);
    createGallery(data.hits);

    if (currentPage === maxPage) {
      lastPage = true;
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.dir(error);

    showErrorToast('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
    event.target.reset();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage + 1);

    createGallery(data.hits);
    currentPage++;

    const galleryItem = document.querySelector('.gallery-item');
    const itemHeight = galleryItem.getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage === maxPage) {
      lastPage = true;

      showWarningToast(
        "We're sorry, but you've reached the end of search results."
      );
      hideLoadMoreBtn();
    }
  } catch (error) {
    showErrorToast('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
});
