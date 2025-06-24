import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import GoogleButton from '../shared/GoogleButton';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, setUserProfile } = useAuth();
    // console.log(createUser);

    const handleRegister = data => {
        // console.log(data);
        const { email, password, name } = data;
        createUser(email, password)
            .then(userCredentials => {
                console.log('user created a new account', userCredentials);
                setUserProfile({ displayName: name })
                    .then(() => {
                        console.log('profile updated');
                    }).catch(err => {
                        const errCode = err.code;
                        const errMessage = err.message;
                        console.error(errCode, errMessage);
                    })
            }).catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                console.error(errCode, errMessage);
            })
    }

    return (
        <div>
            <h4 className='text-[42px] font-extrabold text-black'>Create Account</h4>
            <p className='text-black text-base mb-5'>Register With ProFast</p>
            <span className=' text-black'>
                <FaRegUserCircle size={40} />
            </span>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className='mt-5'>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="name">Name</label>
                    <input type="text"
                        {...register('name', { required: true, minLength: 4 })}
                        className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A] text-black' placeholder='Email' />
                    {
                        errors.name?.type === 'required'
                            ? <p className='text-red-500'>Name field can't be empty</p>
                            : errors.name?.type === 'minLength'
                                ? <p className='text-red-500'>Enter a valid name</p>
                                : ''
                    }
                </legend>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="email">Email</label>
                    <input type="email"
                        {...register('email', { required: true })}
                        className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A] text-black' placeholder='Email' />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email field can't be empty.</p>
                    }
                </legend>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="password">Password</label>
                    <input type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A] text-black' placeholder='Password' />
                    {
                        errors.password?.type === 'required'
                            ? <p className="text-red-500">Password cannot be empty</p>
                            : errors.password?.type === 'minLength'
                                ? <p className="text-red-500">Password must be at least 6 characters.</p>
                                : ''
                    }
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
            <p className='text-[#71717A] mt-3'>Already have an account?
                <Link to="/login">
                    <span className='text-[#CAEB66] font-medium'>Login</span>
                </Link>
            </p>
            <div className='flex justify-center items-center mt-3'>
                <GoogleButton method={'Register'} />
            </div>
        </div>
    );
};

export default Register;