import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleButton from '../shared/GoogleButton';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Login = () => {

    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    const from = location?.state;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data);
        const { email, password } = data;
        loginUser(email, password)
            .then(userCredentials => {
                console.log('user signed in using email and password->', userCredentials);
                navigate(`${from ? from : "/dashboard"}`);
            }).catch(err => {
                const errCode = err.code;
                const errMessage = err.message;
                console.error(errCode, errMessage);
            })
    }

    return (
        <div>
            <h4 className='text-[42px] font-extrabold text-black'>Welcome Back</h4>
            <p className='text-black text-base'>Login With ProFast</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-5'>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="email">Email</label>
                    <input type="email" {...register("email", { required: true })} className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A] text-black' placeholder='Email' />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
                </legend>
                <legend>
                    <label className='text-black text-sm font-medium' htmlFor="password">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6 })} className='input input-bordered w-full bg-[#FAFDF0] focus:outline-none focus:ring-2 focus:ring-[#CAEB66] focus:border-[#CAEB66] placeholder:text-[#71717A] text-black' placeholder='Password' />
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters</p>
                    }
                </legend>
                <p className='text-sm text-[#71717A] underline hover:text-[#CAEB66] cursor-pointer transition-colors duration-300 mt-3'>Forgot Password?</p>
                <div className='flex justify-center items-center mt-3'>
                    <motion.button
                        initial={{ scale: 1, y: 0 }}
                        whileHover={{ scale: 1.2, y: 10 }}
                        whileTap={{ scale: 0.7, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='btn bg-transparent text-[#CAEB66] rounded-3xl hover:bg-[#CAEB66] hover:text-black transition-colors duration-300 border-0 px-12 py-6 font-extrabold'
                    >Login</motion.button>
                </div>
            </form>

            <p className='text-[#71717A] mt-3'>Don't have an account?
                <Link state={from} to='/register'>
                    <span className='text-[#CAEB66] font-medium'>Register</span>
                </Link>
            </p>

            <p className="text-center text-[#71717A] my-3">Or</p>
            <div className='flex justify-center items-center'>
                <GoogleButton method={'Login'} from={from}/>
            </div>

        </div>
    );
};

export default Login;