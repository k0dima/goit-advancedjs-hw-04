import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

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

  galleryList.innerHTML = galleryMarkup;
  lightbox.refresh();
};

export const clearGallery = () => {
  galleryList.innerHTML = '';
};

export const showLoader = () => {
  loader.classList.add('is-visible');
};

export const hideLoader = () => {
  loader.classList.remove('is-visible');
};
