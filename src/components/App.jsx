import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from './Layout';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { fetchImages, PER_PAGE } from './serviceApi/imagesApi';

export const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    setIsLoading(true);
    setError('');

    fetchImages(searchText, page)
      .then(images => {
        if (images.hits.length === 0) {
          return toast.info('Вибачте, картинок не знайдено');
        }

        const perPage = PER_PAGE;
        const totalPages = Math.ceil(images.totalHits / perPage);
        const hasMorePages = totalPages > page;

        setImages(prevImages => [...prevImages, ...images.hits]);
        setLoadMore(hasMorePages);
      })
      .catch(error => setError('Упссс, щось пішло не так'))
      .finally(() => setIsLoading(false));
  }, [searchText, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onChangeQuery = searchText => {
    setSearchText(searchText);
    setPage(1);
    setImages([]);
    setError(null);
  };

  return (
    <Layout>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onChangeQuery} />
      {error && toast.error(error)}
      {images.length > 0 && (
        <ImageGallery images={images} searchQuery={searchText} page={page} />
      )}
      {isLoading && <Loader />}
      {!isLoading && images.length !== 0 && loadMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </Layout>
  );
};
