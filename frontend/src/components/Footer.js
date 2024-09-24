import React from 'react'
import Heading from './Heading'
// import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaQrcode, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className='w-7xl flex-shrink-1  h-60 flex justify-around items-center bg-soft-pastel-blue mobile:px-2 md:px-5 px-20 mt-10' >
       <div className=' flex flex-col text-xl mobile:gap-3 gap-6 justify-start font-bold items-center text-center text-white'>
       <h2>Download Our App</h2>
       <FaQrcode className='w-24 h-24 mobile:w-8 mobile:h-8'></FaQrcode>
       
       </div>
       <div className='flex flex-col  items-center font-sans justify-start  text-center text-white'>
       <Heading level={1} title='ShopEase.' className={'text-white '}/>
       <p>High quality is our first priority</p>
       <p>copyright 2024 Altaf Patel</p>
       </div>

       <div className=' flex flex-col text-xl font-sans  items-center justify-start  mobile:gap-0 gap-2 text-center text-white'>
        <h2 className='text-xl font-sans font-bold'>Follow Us</h2>
        <a href='nln' className=' flex gap-1 group items-center'><FaInstagram className='w-5 h-5 group-hover:fill-red-700'></FaInstagram>  Intagram</a>
        <a href='nln' className=' flex gap-1 group items-center'><FaFacebook className='w-5 h-5 group-hover:fill-blue-700'></FaFacebook>  FaceBook</a>
        <a href='nln' className=' flex gap-1 group items-center'><FaTwitter className='w-5 h-5 group-hover:fill-blue-700'></FaTwitter>  Twitter</a>

       </div>


        
    </div>
  )
}

export default Footer