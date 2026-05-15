import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const createGallery = images => {
  const galleryMarkup = images
    .map(
      image => `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <p class="info-title">Likes</p>
            <p class="info-value">${image.likes}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Views</p>
            <p class="info-value">${image.views}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Comments</p>
            <p class="info-value">${image.comments}</p>
          </div>
          <div class="gallery-info-item">
            <p class="info-title">Downloads</p>
            <p class="info-value">${image.downloads}</p>
          </div>
        </div>
      </li>
    `
    )
    .join('');

  refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
};

export const clearGallery = () => {
  refs.galleryList.innerHTML = '';
};

export const showLoader = () => {
  refs.loader.classList.add('is-visible');
};

export const hideLoader = () => {
  refs.loader.classList.remove('is-visible');
};

export const showLoadMoreBtn = () => {
  if (refs.loadMoreBtn.classList.contains('is-visible')) {
    return;
  }

  refs.loadMoreBtn.classList.add('is-visible');
};

export const hideLoadMoreBtn = () => {
  if (!refs.loadMoreBtn.classList.contains('is-visible')) {
    return;
  }
  refs.loadMoreBtn.classList.remove('is-visible');
};

const defaultToastOptions = {
  position: 'topRight',
  maxWidth: 432,
};

export const showErrorToast = message => {
  iziToast.error({
    ...defaultToastOptions,
    message,
    backgroundColor: '#ef4040',
    messageColor: '#fafafb',
    iconColor: '#fafafb',
    progressBarColor: '#b51b1b',
  });
};

export const showWarningToast = message => {
  iziToast.warning({
    ...defaultToastOptions,
    message,
    title: 'Warning',
    backgroundColor: '#aedbf9ff',
    messageColor: '#242424',
    iconColor: '#242424',
    progressBarColor: '#242424',
  });
};
