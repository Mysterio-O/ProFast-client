import React from 'react';
import logo from '../../../assets/logo.png';
import { motion } from 'motion/react'

const ProFastLogo = () => {

    const imageVariant = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeInOut' }
    }

    const paragraphVariant = {
        initial: { opacity: 0, scale: 0.5, x: 30 },
        animate: { opacity: 1, scale: 1, x: 0 },
        transition: { duration: 0.5, ease: 'easeInOut' }
    }

    return (
        <div className='flex items-end'>
            <motion.img
                variants={imageVariant}
                initial="initial"
                animate="animate"
                transition="transition"
                src={logo} alt=""
                className='mb-1' />
            <motion.p
                variants={paragraphVariant}
                initial="initial"
                animate="animate"
                transition="transition"
                className='text-3xl -ml-4 text-black font-extrabold'>Profast</motion.p>
        </div>
    );
};

export default ProFastLogo;