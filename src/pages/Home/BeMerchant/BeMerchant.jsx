import React from 'react';
import locationImg from '../../../assets/location-merchant.png';

const BeMerchant = () => {
    return (
        <div className='bg-[#03373D] p-10 md:p-20 rounded-4xl flex flex-col md:flex-row'>
            <div>
                <h2 className='text-[40px] font-extrabold text-white'>Merchant and Customer Satisfaction is Our First Priority</h2>
                <p className='text-base text-[#DADADA]'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                <div className='flex gap-4 mt-8'>
                    <button className='btn rounded-full bg-[#CAEB66] text-black hover:bg-transparent hover:text-[#CAEB66] hover:border-[#CAEB66] transition-colors duration-300'>Become A Merchant</button>
                    <button className='btn bg-transparent rounded-full border-[#CAEB66] text-[#CAEB66] hover:bg-[#CAEB66] hover:text-black transition-colors duration-300'>Earn with Profast Courier</button>
                </div>
            </div>
            <div className='w-[531px] h-[200px]'>
                <img src={locationImg} alt="" className='w-full h-full' />
            </div>
        </div>
    );
};

export default BeMerchant;