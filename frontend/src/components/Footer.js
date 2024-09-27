import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaInstagram,FaTwitter,FaFacebook,FaQrcode} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-8 py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Download Our App */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-4">Download Our App</h4>
          <div className="flex justify-center sm:justify-start">
            {/* QR Code or App Store Links */}
            <FaQrcode   className="w-24 h-24" />
          </div>
        </div>

        {/* ShopEase Branding */}
        <div className="text-center">
          <h2 className="text-xl font-bold">ShopEase</h2>
          <p className="text-gray-400 mt-2">
            High quality is our first priority
          </p>
          <p className="text-gray-400 mt-1">
            &copy; 2024 Altaf Patel
          </p>
        </div>

        {/* Follow Us */}
        <div className="text-center sm:text-right">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center sm:justify-end space-x-4">
            <a href="https://www.instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagram className='w-5 h-5' />
            </a>
            <a href="https://www.facebook.com" className="text-gray-400 hover:text-white">
            <FaFacebook className='w-5 h-5' />
            </a>
            <a href="https://www.twitter.com" className="text-gray-400 hover:text-white">
            <FaTwitter className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
