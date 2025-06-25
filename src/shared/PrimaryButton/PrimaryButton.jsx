import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const PrimaryButton = ({text}) => {
    return (
        <div className='flex gap-2 items-center group'>
            <button className="bg-[#CAEB66] btn rounded-2xl font-bold text-black border-0 px-8 py-4 group-hover:scale-110 transition-all duration-300">
                {text}
            </button>
            <span
                className='text-[#CAEB66] bg-black rounded-full p-2 -rotate-45 group-hover:rotate-0 transition-all duration-300'>
                <FaArrowRight size={32} />
            </span>
        </div>
    );
};

export default PrimaryButton;