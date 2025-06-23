import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import GoogleButton from '../shared/GoogleButton';
import {motion} from 'motion/react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div>
            <h4 className='text-[42px] font-extrabold text-black'>Create Account</h4>
            <p className='text-black text-base mb-5'>Register With ProFast</p>
            <span className=' text-black'>
                <FaRegUserCircle size={40}/>
            </span>
            <form className='mt-5'>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="name">Name</label>
                    <input type="text" name="name" className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A]' placeholder='Email' />
                </legend>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="email">Email</label>
                    <input type="email" name="email" className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A]' placeholder='Email' />
                </legend>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="password">Password</label>
                    <input type="password" name="password" className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A]' placeholder='Password' />
                </legend>
                <div className='flex justify-center items-center mt-3'>
                    <motion.button
                        initial={{ scale: 1, y: 0 }}
                        whileHover={{ scale: 1.2, y: 10 }}
                        whileTap={{ scale: 0.7, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='btn bg-transparent text-[#CAEB66] rounded-3xl hover:bg-[#CAEB66] hover:text-black transition-colors duration-300 border-0 px-12 py-6 font-extrabold'
                    >Register</motion.button>
                </div>
            </form>
            <p className='text-[#71717A] mt-3'>Don't have an account?
                <Link>
                    <span className='text-[#CAEB66] font-medium'>Register</span>
                </Link>
            </p>
            <div className='flex justify-center items-center mt-3'>
                <GoogleButton method={'Register'} />
            </div>
        </div>
    );
};

export default Register;