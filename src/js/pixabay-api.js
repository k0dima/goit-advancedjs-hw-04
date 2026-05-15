import axios from 'axios';

const API_KEY = '31763497-bdd76f24c07d5bc4c9ffc4065';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = query => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
};
