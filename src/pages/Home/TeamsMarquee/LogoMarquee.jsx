import React from 'react';
import image1 from '../../../assets/brands/amazon.png';
import image2 from '../../../assets/brands/amazon_vector.png';
import image3 from '../../../assets/brands/casio.png';
import image4 from '../../../assets/brands/moonstar.png';
import image5 from '../../../assets/brands/randstad.png';
import image6 from '../../../assets/brands/start-people 1.png';
import image7 from '../../../assets/brands/start.png';
import Marquee from "react-fast-marquee";

const LogoMarquee = () => {

    const clientCompanies = [image1, image2, image3, image4, image5, image6, image7];

    return (
        <Marquee>
            {
                clientCompanies.map((logo, index) => (
                    <img key={index} src={logo} alt="" className='mr-20'/>
                ))
            }
        </Marquee>
    );
};

export default LogoMarquee;