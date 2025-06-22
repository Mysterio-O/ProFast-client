import React from 'react';
import bookingIcon from '../../../assets/bookingIcon.png';

const HowItWorks = () => {

    const worksVars = [
        {
            id: 1,
            img: bookingIcon,
            title: 'Booking Pick & Drop',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 2,
            img: bookingIcon,
            title: 'Cash On Delivery',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 3,
            img: bookingIcon,
            title: 'Delivery Hub',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 4,
            img: bookingIcon,
            title: 'Booking SME & Corporate',
            description: 'From personal packages to business shipments — we deliver on time, every time.'
        }
    ]

    return (
        <div className=''>
            <h2 className='font-extrabold text-lg md:text-3xl text-[#03373D] mb-8'>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                {
                    worksVars.map(work => (
                        <div
                            key={work.id}
                            className='bg-[#FFFFFF] rounded-3xl p-8 hover:shadow-2xl hover:scale-110 hover:bg-blue-300 transition-all duration-300 group'
                        >
                            <div className='mb-6'>
                                <img src={work.img} alt="" />
                            </div>
                            <div className='space-y-4'>
                                <h3 className='font-bold text-[#03373D] text-xl group-hover:text-white'>{work.title}</h3>
                                <p className='font-medium text-[1rem] text-[#606060] group-hover:text-white'>{work.description}</p>
                            </div>
                            <div className=' bg-orange-400 mt-5 h-0 w-0 group-hover:h-1 group-hover:w-full transition-all duration-500' />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HowItWorks;