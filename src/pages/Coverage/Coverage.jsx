import React, { useState } from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';
import Search from './Search';

const Coverage = () => {

    const serviceCenters = useLoaderData();
    // console.log(serviceCenters);

    const [activeCoords, setActiveCoords] = useState(null);


    const transferData = (data) => {
        setActiveCoords(data);
    }
    // console.log('active coords from coverage->', activeCoords);
    return (
        <div className='min-h-[calc(100vh-404px)] mt-8 mx-4 px-4 py-4 md:mx-12 mb-24 bg-white rounded-2xl md:px-28 md:py-20'>
            <h2 className='text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#03373D] mb-4 lg:mb-12'>We are available in 64 districts</h2>
            <div>
                <Search serviceCenters={serviceCenters} transferData={transferData} />
            </div>
            <div className='overflow-hidden'>
                <h2 className='text-base md:text-xl lg:text-3xl font-extrabold text-[#03373D] mb-12'>We deliver almost all over Bangladesh.</h2>
                <BangladeshMap serviceCenters={serviceCenters} activeCoords={activeCoords}/>
            </div>
        </div>
    );
};

export default Coverage;