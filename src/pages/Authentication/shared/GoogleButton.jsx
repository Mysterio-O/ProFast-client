import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../../../hooks/useAxiosPublic/useAxiosPublic';

const GoogleButton = ({ method,from }) => {

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()

    const handleGoogleLogin = () => {


        signInWithGoogle().then(async(result) => {
            console.log('user signed in using google->', result);

            const email=result.user.email
            // console.log(result.user,'email->',email);
            const userInfo = {
                email,
                role:'user',
                created_at: new Date().toISOString(),
                last_log_in:new Date().toISOString(),
                method:'google'
            }

            if(method === 'Register'){
            const res = await axiosPublic.post('/users',userInfo)
            console.log(res.data);
        }

            navigate(`${from ? from : "/dashboard"}`)
        }).catch(err => {
            const errCode = err.code;
            const errMessage = err.message;
            console.error(errCode, errMessage);
        })
    }

    return (
        <button onClick={handleGoogleLogin} className="btn btn-wide bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            {method} with Google
        </button>
    );
};

export default GoogleButton;