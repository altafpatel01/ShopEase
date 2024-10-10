import React, { Fragment, useEffect, useState } from 'react'
import HorizontalStepper from './HorizontalStepper'
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, initializeShippigInfo } from '../Reducers/shippingInfo';
import { useNavigate } from 'react-router-dom';
import { Country, State } from "country-state-city";
import { IoHome, IoPin } from 'react-icons/io5';
import { MdLocationCity, MdPublic, MdTransferWithinAStation } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';


function Shipping() {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const { info } = useSelector((state) => state.shipping);
  const [address, setAddress] = useState(info.address||'');
  const [city, setCity] = useState(info.city||'');
  const [state, setState] = useState(info.state||'');
  const [country, setCountry] = useState(info.country||'');
  const [pinCode, setPinCode] = useState(info.pinCode||'');
  const [phoneNo, setPhoneNo] = useState(info.phoneNo||'xxxxxxxxxx');
const {userInfo,isAuthenticated} = useSelector(state=>state.user)
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      Swal.fire("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      addInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  const id = isAuthenticated?userInfo._id:0

  useEffect(()=>{
    if(isAuthenticated)
    dispatch(initializeShippigInfo(id))
  },[isAuthenticated,dispatch,id])
  return (
    <Fragment>
      <div>
        <div className='mt-10'>
             <HorizontalStepper  step={0}/>
             </div>
      <div className="shippingContainer ">
        <div className="shippingBox  flex flex-col  justify-center items-center gap-5">
          <h2 className="shippingHeading mt-10">Shipping Details</h2>

          <form
            className="shippingForm flex flex-col gap-3"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className='relative border border-black'>
              <IoHome className='absolute top-[50%] translate-y-[-50%]' />
              <input className='py-1 px-5 focus:outline-none'
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className='relative border border-black'>
              <MdLocationCity  className='absolute top-[50%] translate-y-[-50%]' />
              <input className='py-1 px-5 focus:outline-none'
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className='relative border border-black'>
              <IoPin  className='absolute top-[50%] translate-y-[-50%]' />
              <input className='py-1 px-5 focus:outline-none focus:ring-0'
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className='relative border border-black'>
              <FaPhone className='absolute top-[50%] translate-y-[-50%]' />
              <input className='py-1 px-5 focus:outline-none focus:ring-0'
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className='relative border border-black'>
              <MdPublic  className='absolute top-[50%] translate-y-[-50%]' />

              <select
              className='py-1 px-5 max-w-52 focus:outline-none'
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option  value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className='relative border border-black'>
                {/* <MdTransferWithinAStation  className='absolute top-[50%] translate-y-[-50%]'/> */}
                <MdTransferWithinAStation  className='absolute top-[50%] translate-y-[-50%]' />
                <select  className='py-1 px-5 max-w-52 focus:outline-none'
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input 
              type="submit"
              value="Continue"
              className="shippingBtn w-28 mx-auto focus-visible:hidden rounded-sm text-white py-1 bg-soft-pastel-blue "
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
      </div>
 
    </Fragment>
  )
}

export default Shipping