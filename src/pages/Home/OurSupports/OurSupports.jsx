import React from 'react';
import image1 from '../../../assets/illustrations/Illustration.png';
import image2 from '../../../assets/illustrations/Vector (1).png';
import SupportsCard from './SupportsCard';

const OurSupports = () => {

    const services = [
        {
            id:1,
            title:'Live Parcel Tracking',
            description:"Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            image:image1
        },
        {
            id:2,
            title:'100% Safe Delivery',
            description:'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
            image:image2
        },
        {
            id:3,
            title:'24/7 Call Center Support',
            description:"Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            image:image2
        }
    ]

    return (
        <div>
            {
                services.map(service => <SupportsCard key={service.id} service={service}/> )
            }
        </div>
    );
};

export default OurSupports;