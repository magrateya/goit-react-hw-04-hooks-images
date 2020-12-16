import React, { Component } from 'react';

import imgApi from './services/img-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import LoaderRings from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

export default class ImagesView extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (prevState.hits.length !== this.state.hits.length) {
      this.scrollDown();
    }
  }

  onChangeQuery = query => {
    // console.log(query);
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      currentPage,
      searchQuery,
    };

    this.setState({ isLoading: true });

    imgApi
      .fetchImages(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: currentPage + 1,
        }));
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  openModal = url => {
    this.setState({ largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { hits, isLoading, error, largeImageURL } = this.state;
    const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <>
        {largeImageURL && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={largeImageURL} />
          </Modal>
        )}
        <Searchbar onSubmit={this.onChangeQuery} />
        {error && <h1>Упс, виникла помилка - {error.message}</h1>}

        {hits.length > 0 && (
          <ImageGallery hits={hits} onImgClick={this.openModal} />
        )}
        {isLoading && <LoaderRings />}
        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
      </>
    );
  }
}
