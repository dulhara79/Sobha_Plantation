import React, { useState, useEffect } from 'react';
import { Breadcrumb, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Square-sized images you want to display
import img1 from '../../assets/ProductsImg/all.jpg';
import img2 from '../../assets/ProductsImg/img12.jpg';
import img3 from '../../assets/ProductsImg/img20.jpg';
import img4 from '../../assets/ProductsImg/img23.jpg';
import img5 from '../../assets/ProductsImg/img26.jpg';
import img6 from '../../assets/ProductsImg/img29.jpg';
import img7 from '../../assets/ProductsImg/img15.jpg';
import img8 from '../../assets/ProductsImg/path_5619.jpg';
import img9 from '../../assets/ProductsImg/img13.jpg';
import img10 from '../../assets/ProductsImg/img28.jpg';
import img11 from '../../assets/ProductsImg/img14.jpg';
import img12 from '../../assets/ProductsImg/img32.jpg';
import img13 from '../../assets/ProductsImg/img22.jpg';
import img14 from '../../assets/ProductsImg/img10.jpg';
import img15 from '../../assets/ProductsImg/img30.jpg';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTopImage, setCurrentTopImage] = useState(0);
  const itemsPerPage = 8; // Updated to show 8 images per page

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15]; // Array of your image imports

  const imageDescriptions = [
    'A variety of coconut products showcasing our diverse offerings.',
    'Natural coconut shells, ideal for crafting and decor.',
    'Our premium coconut oil, extracted with care and precision.',
    'Handcrafted coir products for eco-friendly solutions.',
    'High-quality coconut water for a refreshing and hydrating experience.',
    'Coconut cream made from the finest coconuts for a rich flavor.',
    'Premium coconut oil for skincare and cooking.',
    'Handcrafted coir products for eco-friendly solutions.',
    'Versatile coconut shell products for various uses.',
    'High-quality coconut cream for a creamy texture.',
    'Innovative coir products for sustainable living.',
    'Freshly sourced coconut milk, perfect for cooking and baking.',
    'High-quality coconut water for a refreshing and hydrating experience.',
    'Our entire coconut product lineup, showcasing quality and variety.',
    'A snapshot of our extensive coconut product range.',
  ]; // Descriptions for each image

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  // Handle pagination logic
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentGalleryItems = images.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Change top image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Inline styles for the gallery
  const galleryContainerStyle = {
    padding: '20px',
    backgroundColor: '#f0f2f5',
  };

  const topImageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    marginBottom: '20px',
  };

  const topImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    transition: 'opacity 0.5s ease-in-out',
  };

  const topImageOverlayStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '0 0 8px 8px',
  };

  const galleryGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: '20px',
  };

  const galleryItemStyle = {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    height: '300px', // Fixed height for uniformity
    maxWidth: '300px', // Fixed width for uniformity
    maxHeight: '300px', // Fixed height for uniformity
  };

  const galleryItemHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const galleryImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  };

  const lightboxStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.5s',
  };

  const lightboxImageStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    animation: 'zoomIn 0.5s',
  };

  const galleryPaginationStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div style={galleryContainerStyle}>
      {/* Navigation Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/products/productdashboard')}>
          <ArrowBackIcon /> 
        </Breadcrumb.Item>
        <Breadcrumb.Item>Gallery</Breadcrumb.Item>
      </Breadcrumb>
      
      {/* Top Image with Overlay */}
      <div style={topImageContainerStyle}>
        <img src={images[currentTopImage]} alt="Top Gallery" style={topImageStyle} />
        <div style={topImageOverlayStyle}>
          <h2>Gallery Highlights</h2>
          <p>Explore our collection of stunning images showcasing our products.</p>
        </div>
      </div>

      {/* Image Grid */}
      <div style={galleryGridStyle}>
        {currentGalleryItems.map((image, index) => (
          <div
            key={index}
            style={galleryItemStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = galleryItemHoverStyle.transform;
              e.currentTarget.style.boxShadow = galleryItemHoverStyle.boxShadow;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => openLightbox(image)}
          >
            <img src={image} alt={`Gallery ${index}`} style={galleryImageStyle} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px' }}>
              {imageDescriptions[startIdx + index]}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div style={lightboxStyle} onClick={closeLightbox}>
          <img src={selectedImage} alt="Selected" style={lightboxImageStyle} />
        </div>
      )}

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={images.length}
        onChange={handlePageChange}
        style={galleryPaginationStyle}
      />
    </div>
  );
};

export default Gallery;
