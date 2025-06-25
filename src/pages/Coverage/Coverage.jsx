import React from 'react';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {
    return (
        <div className='min-h-[calc(100vh-404px)] mt-8 mx-12 mb-24 bg-white rounded-2xl px-28 py-20'>
            <h2 className='text-5xl font-extrabold text-[#03373D] mb-12'>We are available in 64 districts</h2>

            <div className='overflow-hidden'>
                <h2 className='text-3xl font-extrabold text-[#03373D] mb-12'>We deliver almost all over Bangladesh.</h2>
                <BangladeshMap/>
            </div>
        </div>
    );
};

export default Coverage;