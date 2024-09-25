import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules'; // Updated import for Swiper v8+

import productIMG1 from '../assets/ProductsImg/img12.jpg';
import productIMG2 from '../assets/ProductsImg/img12.jpg';
import productIMG3 from '../assets/ProductsImg/img12.jpg';
import vission_IMG_01 from '../assets/vission_IMG_01.png';
import vission_IMG_02 from '../assets/vission_IMG_02.png';
import vission_IMG_03 from '../assets/vission_IMG_03.png';

const LandingPage = () => {
  const [headerExpanded, setHeaderExpanded] = useState(true);
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setHeaderExpanded(false);
    } else {
      setHeaderExpanded(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <AppBar position="fixed" className={`transition-all duration-500 ${headerExpanded ? 'h-32' : 'h-16'}`}>
        <Toolbar className="flex justify-between">
          <div className="text-2xl">Brand</div>
          <div className={`transition-all duration-500 ${searchBarVisible ? 'w-full bg-white bg-opacity-50' : ''}`}>
            {searchBarVisible ? (
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                className="w-full"
              />
            ) : (
              <IconButton onClick={() => setSearchBarVisible(true)}>
                <SearchIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <section className="flex items-center justify-center h-screen">
        <Swiper
          modules={[Autoplay, EffectFade]} // Updated to specify the modules used
          autoplay={{ delay: 3000 }}
          effect="fade"
          className="w-full h-full"
        >
          <SwiperSlide className="bg-center bg-cover" style={{ backgroundImage: `url(${productIMG1})` }}></SwiperSlide>
          <SwiperSlide className="bg-center bg-cover" style={{ backgroundImage: `url(${productIMG2})` }}></SwiperSlide>
          <SwiperSlide className="bg-center bg-cover" style={{ backgroundImage: `url(${productIMG3})` }}></SwiperSlide>
        </Swiper>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl text-center">Our Products</h2>
          <div className="mt-10 overflow-y-scroll h-80">
            {/* Product list goes here */}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl text-center">Mission & Vision</h2>
          <div className="flex mt-10">
            <div className="w-1/2">
              <p className="text-xl">Our Mission...</p>
              <p className="text-xl">Our Vision...</p>
            </div>
            <div className="flex justify-end w-1/2">
              {/* Images sliding in from the right */}
              <div className="animate-slideInFromRight">
                <img src={vission_IMG_01} alt="Image 4" />
                <img src={vission_IMG_02} alt="Image 5" />
                <img src={vission_IMG_03} alt="Image 6" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
