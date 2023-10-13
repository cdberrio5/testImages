import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCircleXmark } from "react-icons/fa6";
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { uploadImages } from './../../services/api';
import './insertImage.scss';

const ImageUploadModal = ({ isOpen, onRequestClose }: any) => {
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files);
      setImages([...images, ...selectedImages]);

      const selectedImagePreviews = selectedImages.map(image =>
        URL.createObjectURL(image)
      );
      setImagePreviews([...imagePreviews, ...selectedImagePreviews]);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div>
        <FaAngleRight />
      </div>
    ),
    prevArrow: (
      <div>
        <FaAngleLeft />
      </div>
    )
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia la solicitud POST al servicio de API REST
      const response = await uploadImages(name, images);

      // Maneja la respuesta del servicio
      console.log('Respuesta del servicio:', response.data);
      

    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la solicitud
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Subir Imágenes"
      ariaHideApp={false}
      className="modal"
    >
      <div className='close' onClick={onRequestClose}>
        <FaCircleXmark />
      </div>
      <h2>Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
          </label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>

        <div>
          <label>
            Imágenes:
          </label>
          <input type="file" multiple onChange={handleImageChange} accept="image/jpg, image/jpeg" />
        </div>
        {imagePreviews.length > 0 && (
          <div>
            <h3>Vista Previa:</h3>
            <Slider {...settings}>
              {imagePreviews.map((preview, index) => (
                <div key={index} style={{width: "100%", height: '300px'}}>
                  <img src={preview} style={{objectFit: 'contain', objectPosition: 'center', width: "100%", height: "100%"}} alt={`Preview ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}
        
        <div className="buttons">
          <button type="button" onClick={() => { onRequestClose(); setImagePreviews([])} }>Cancel</button>

          <button type="submit" style={{background: "#1e88e5", color: "white"}}>Upload</button>
        </div>

      </form>
    </Modal>
  );
};

export default ImageUploadModal;
