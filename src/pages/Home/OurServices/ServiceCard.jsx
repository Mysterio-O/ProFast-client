import React from 'react';
import { motion } from 'motion/react';

const ServiceCard = ({ service }) => {
    const { title, description, icon: Icon } = service;
    return (
        <motion.div
            initial={{
                scale: 1, rotateX: 0, rotateY:0,zIndex:1
            }}
            whileHover={{ scale: 1.5, rotateY:'-5deg', rotateX:'-45deg',zIndex:5  }}
            transition={{duration:0.3}}
            className='bg-white rounded-3xl py-8 px-6 hover:bg-[#CAEB66] transition-colors duration-300'>
            <div className='h-20 w-20 p-4 bg-gradient-to-r from-[rgba(7,78,205,0)] via-[rgba(6,174,201,37)] to-[rgba(7,178,205,100)] rounded-full mx-auto'>
                <Icon size={30} className="w-full h-full" />
            </div>
            <div className='text-center space-y-4'>
                <h4 className='font-bold text-2xl text-[#03373D]'>{title}</h4>
                <p className='font-medium text-base text-[#606060]'>{description}</p>
            </div>
        </motion.div>
    );
};

export default ServiceCard;