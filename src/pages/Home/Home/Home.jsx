import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';

const Home = () => {
    return (
        <div>
            <section className='mb-16 px-12'>
                <Banner/>
            </section>
            <section className='px-12 md:px-28 lg:px-40'>
                <HowItWorks/>
            </section>
            <section className='mx-4 md:mx-12 rounded-xl md:rounded-4xl mb-24 bg-[#03373D]'>
                <OurServices/>
            </section>
        </div>
    );
};

export default Home;