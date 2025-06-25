import React from 'react';
import { NavLink } from 'react-router';
import ProFastLogo from '../ProFastLogo/ProFastLogo';
import PrimaryButton from '../../../shared/PrimaryButton/PrimaryButton';
import useAuth from '../../../hooks/useAuth';
const Navbar = () => {

    const { user, userLogOut } = useAuth();

    const navLinks = <>
        <NavLink to='/'><li className='text-gray-800'>Home</li></NavLink>
        <NavLink to='/about'><li className='text-gray-800'>About</li></NavLink>
        <NavLink to='/coverage'><li className='text-gray-800'>Coverage</li></NavLink>

    </>

    const handleSignOut = () => {
        userLogOut().then(() => {
            console.log('user signed out successfully!')
        }).catch(err => {
            const errCode = err.code;
            const errMessage = err.message;
            console.error(errCode, errMessage);
        })
    }

    return (
        <div className="navbar bg-[#FFFFFF] shadow-sm rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-x-2">
                        {navLinks}
                    </ul>
                </div>
                <ProFastLogo color={'gray-800'} />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='flex gap-4 items-center'>
                    {
                        user ? <button onClick={handleSignOut} className="btn bg-orange-400 text-black px-8 py-4 border-0 rounded-xl border-t-2">Sign Out</button> : <button className="btn bg-transparent text-black px-8 py-4 border-0 rounded-xl border-t-2">Sign In</button>
                    }

                    <PrimaryButton text='Become a Rider' />
                </div>
            </div>
        </div>
    );
};

export default Navbar;