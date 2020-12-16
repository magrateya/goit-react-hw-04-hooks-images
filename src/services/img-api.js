import axios from 'axios';

const fetchImages = (searchQuery = '', currentPage = 1) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '18994558-99c21eb2af8503bc6443a1f41';
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`;

  return axios.get(url).then(response => response.data.hits);
};

export default fetchImages;
