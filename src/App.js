import React, { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import fetchImages from './services/img-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import LoaderRings from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

export default function ImagesView() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setIsLoading(true);

    fetchImages(searchQuery, currentPage)
      .then(hits => {
        setHits(state => [...state, ...hits]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setError({ error });
      })
      .finally(() => setIsLoading(false));
  }, [searchQuery, currentPage]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
    setError(null);
  };

  const openModal = url => {
    setLargeImageURL(url);
  };

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

  return (
    <>
      {largeImageURL && (
        <Modal onClose={() => setLargeImageURL('')}>
          <img src={largeImageURL} alt={largeImageURL} />
        </Modal>
      )}
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>Упс, виникла помилка - {error.message}</h1>}
      <ToastContainer autoClose={3000} />

      {hits.length > 0 && <ImageGallery hits={hits} onImgClick={openModal} />}
      {isLoading && <LoaderRings />}
      {shouldRenderLoadMoreButton && (
        <Button onClick={() => setCurrentPage(state => state + 1)} />
      )}
    </>
  );
}
