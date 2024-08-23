import React from 'react';
import { Twitter, Instagram , Facebook, AlternateEmail, Email, Call } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className='relative'>
    <footer className="mt-3 mb-px text-black no-underline -6 bg-gradient-to-r from-green-400 to-blue-500">
      <div className="container flex justify-between mx-auto">
        <div>
          <h3 className="text-lg font-bold">SOBHA</h3>
          <p className="text-sm w-80">Sobha Plantation Project: Sustainable coconut farming on 11 acres in Kururegali, ensuring quality products, operational transparency, and community support, while providing real-time updates to our overseas owner.</p>
          <div className="flex mt-2 space-x-4">
            <a className='' href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            < a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="space-y-2 no-underline">
            <li><a href="/home" className="text-black no-underline hover:underline">Home</a></li>
            <li><a href="/about" className="text-black no-underline hover:underline">About Us</a></li>
            <li><a href="/contact" className="text-black no-underline hover:underline">Contact Us</a></li>
            <li><a href="/products" className="text-black no-underline hover:underline">Products</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Community</h4>
          <ul className="space-y-2 no-underline">
            <li><a href="/help" className="text-black no-underline hover:underline">Help Center</a></li>
            <li><a href="/partners" className="text-black no-underline hover:underline">Partners</a></li>
            <li><a href="/blog" className="text-black no-underline hover:underline">Blog</a></li>
            <li><a href="/news" className="text-black no-underline hover:underline">News</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Contact</h4>
          <div className='flex flex-row items-center justify-start w-full py-2 mt-0 mb-0 text-center no-underline '>
            <Call />
            <p className='pl-8'>0112 751 757 / 075 216 9421</p>
          </div>
          <div className='flex flex-row items-center justify-start w-full py-2 mt-0 mb-0 text-center no-underline '>
            <Email />
          <p className='pl-8'>info@gmail.com</p>
          </div>
          <div className='flex flex-row items-center justify-start w-full py-2 mt-0 mb-0 text-center no-underline '>
            <AlternateEmail />
          <p className='pl-8'>317/23, Nikaweratiya, Kurunagala, Sri Lanka.</p>
            </div>
        </div>
      </div>
    </footer>
    <div className="w-full mt-0 text-center align-baseline bg-black">
    <p className='mt-0 text-white'>© 2024 sobhaplantation.lk. All rights reserved.</p>
  </div>
  </div>
  );
};

export default Footer;
