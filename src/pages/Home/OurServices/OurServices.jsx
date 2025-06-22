import React from 'react';
import { FaShippingFast, FaGlobe, FaBoxOpen, FaMoneyBillWave, FaBuilding, FaUndoAlt } from "react-icons/fa";
import ServiceCard from './ServiceCard';
const OurServices = () => {


    const services = [
        {
            id:1,
            title: "Express & Standard Delivery",
            description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
            icon: FaShippingFast
        },
        {
            id:2,
            title: "Nationwide Delivery",
            description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
            icon: FaGlobe
        },
        {
            id:3,
            title: "Fulfillment Solution",
            description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
            icon: FaBoxOpen
        },
        {
            id:4,
            title: "Cash on Home Delivery",
            description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
            icon: FaMoneyBillWave
        },
        {
            id:5,
            title: "Corporate Service / Contract In Logistics",
            description: "Customized corporate services which includes warehouse and inventory management support.",
            icon: FaBuilding
        },
        {
            id:6,
            title: "Parcel Return",
            description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
            icon: FaUndoAlt
        }
    ];

    return (
        <div
        className='px-8 py-8 md:py-24 md:px-28'>
            <div className='text-center space-y-4 max-w-3xl mx-auto'>
                <h2 className='text-white text-3xl font-extrabold'>Our Services</h2>
                <p className='text-lg font-medium text-[#DADADA]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {
        services.map(service => <ServiceCard key={service.id} service={service}/>)
    }
</div>
        </div>
    );
};

export default OurServices;