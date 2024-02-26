import React, { useState } from 'react';
import { GalleryItem, GalleryImg, ModalImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ tags, largeImageURL, webformatURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem onClick={toggleModal}>
      <GalleryImg src={webformatURL} alt={tags} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalImage src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};
