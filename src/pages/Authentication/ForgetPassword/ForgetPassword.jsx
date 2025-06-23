import React from 'react';
import { Link } from 'react-router';

const ForgetPassword = () => {
    return (
        <div>
            <div className='space-y-3'>
                <h3 className='text-black text-2xl font-extrabold'>Forget Password</h3>
                <p className='text-base text-gray-500'>Enter your email address and we’ll send you a reset link.</p>
            </div>
            <form className='mt-6'>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="email">Email</label>
                    <input type="email" name="email" className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A]' placeholder='Email' />
                </legend>
                <div className='mt-5 flex justify-center items-center'>
                    <button className='btn bg-transparent text-[#CAEB66] rounded-3xl hover:bg-[#CAEB66] hover:text-black transition-colors duration-300 border-0 px-12 py-6 font-extrabold'>Send Verification Code</button>
                </div>
            </form>
            <p className='text-[#71717A] mt-3'>Don't have an account?
                <Link>
                    <span className='text-[#CAEB66] font-medium'>Register</span>
                </Link>
            </p>
        </div>
    );
};

export default ForgetPassword;