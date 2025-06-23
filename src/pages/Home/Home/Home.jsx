import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogoMarquee from '../TeamsMarquee/LogoMarquee';
import OurSupports from '../OurSupports/OurSupports';
import BeMerchant from '../BeMerchant/BeMerchant';
import ReviewSection from '../Reviews/ReviewSection';
import FAQ from '../Accordian/FAQ';

const Home = () => {
    return (
        <div>
            <section className='mb-16 px-12'>
                <Banner />
            </section>
            <section className='px-12 md:px-28 lg:px-40'>
                <HowItWorks />
            </section>
            <section className='mx-4 md:mx-12 rounded-xl md:rounded-4xl mb-24 bg-[#03373D]'>
                <OurServices />
            </section>
            <section className='lg:px-40 lg:my-24'>
                <h3 className='text-center text-3xl text-[#03373D] font-extrabold mb-10'>We've helped thousands of sales teams</h3>
                <LogoMarquee />
            </section>

            <div className="mt-10 border-b-2 border-dashed border-black mb-10 mx-10 md:mb-20 md:mx-40 opacity-30"></div>

            <section className='px-4 md:px-12 lg:px-40 py-4 md:py-8'>
                <OurSupports />
            </section>

            <div className="mt-10 border-b-2 border-dashed border-black mb-10 mx-10 md:mb-20 md:mx-40 opacity-30"></div>

            <section className='px-4 md:px-16 lg:px-40 py-6 md:py-10 lg:py-20'>
                <BeMerchant />
            </section>
            <section>
                <ReviewSection/>
            </section>

            <section className='px-10 md:px-16 lg:px-40'>
                <FAQ/>
            </section>

        </div>
    );
};

export default Home;