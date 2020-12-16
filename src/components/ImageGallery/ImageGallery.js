import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ hits, onImgClick }) {
  return (
    <ul className={s.ImageGallery}>
      {hits.map(hit => (
        <ImageGalleryItem
          key={hit.id}
          webformatURL={hit.webformatURL}
          type={hit.tags}
          largeImageURL={hit.largeImageURL}
          onImgClick={onImgClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  onImgClick: PropTypes.func,
};
