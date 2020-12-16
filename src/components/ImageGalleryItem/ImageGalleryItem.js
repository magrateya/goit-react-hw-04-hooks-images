import React from 'react';
import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  type,
  largeImageURL,
  onImgClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={type}
        className={s.ImageGalleryItemImage}
        onClick={() => onImgClick(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  // id: PropTypes.number,
  webformatURL: PropTypes.string,
  type: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImgClick: PropTypes.func,
};
