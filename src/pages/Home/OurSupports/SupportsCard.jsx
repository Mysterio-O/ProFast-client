import React from 'react';
import { motion } from 'motion/react';

const SupportsCard = ({ service }) => {

    const { title, description, image,id } = service;

    const cardVariants = {
        initial: { scale: 1, y: 0, zIndex:1 },
        whileHover: (customId)=> ({
            zIndex:5,
            scale:1.1,
            y: customId === 1 ? 60 : customId === 2 ? 0: customId === 3 ? -60 : 0
        }),
        transition: { duration: 0.3 }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="whileHover"
            transition="transition"
            custom={id}
            className='mb-6 p-8 flex flex-col md:flex-row bg-white rounded-3xl gap-12 transition-shadow duration-300 md:shadow-lg hover:shadow-cyan-400/50'>

            {/* // image div */}
            <div className='w-32 h-36 flex-shrink-0 mx-auto'>
                <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
            </div>
            <div className='border-b-2 md:border-b-0 md:border-r-2 border-black border-dashed'></div>

            {/* // title and description div */}
            <div className='text-center md:text-start flex flex-col justify-center'>
                <h3 className='text-2xl font-extrabold text-[#03373D]'>{title}</h3>
                <h5 className='text-base font-medium text-[#606060]'>{description}</h5>
            </div>

        </motion.div>
    );
};

export default SupportsCard;