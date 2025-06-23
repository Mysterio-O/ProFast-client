import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import image from '../../../assets/customer-top.png';

// Demo customer reviews (expanded for testing)
const reviews = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    message: `Great service! Package delivered on time to ${['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi'][i % 5]}.`,
    name: `User ${i + 1}`,
    position: ['Customer', 'Rider', 'Merchant', 'Entrepreneur', 'Student'][i % 5],
    photo: `https://i.pravatar.cc/150?img=${(i % 12) + 1}`
}));
/*
// Use this for 12 reviews if you don't want to test with 100
const reviews = [
  { id: 1, message: "Exceptional service! My package arrived in Dhaka within 24 hours. Highly recommend!", name: "Ayesha Rahman", position: "Online Shop Owner", photo: "https://i.pravatar.cc/150?img=1" },
  { id: 2, message: "The rider was very professional and delivered my goods safely to Chittagong.", name: "Md. Faisal Khan", position: "Freelancer", photo: "https://i.pravatar.cc/150?img=2" },
  { id: 3, message: "Easy to use platform and affordable rates. Perfect for my business in Sylhet!", name: "Sadia Islam", position: "Entrepreneur", photo: "https://i.pravatar.cc/150?img=3" },
  { id: 4, message: "Reliable delivery to Khulna. The tracking feature is very helpful!", name: "Arif Hossain", position: "Retailer", photo: "https://i.pravatar.cc/150?img=4" },
  { id: 5, message: "Great experience! My fragile items reached Rajshahi in perfect condition.", name: "Nusrat Jahan", position: "Artist", photo: "https://i.pravatar.cc/150?img=5" },
  { id: 6, message: "Fast and secure delivery to Barisal. Will use again for sure!", name: "Imran Chowdhury", position: "E-commerce Seller", photo: "https://i.pravatar.cc/150?img=6" },
  { id: 7, message: "The rider application process was smooth, and I love working with this platform!", name: "Rashedul Alam", position: "Delivery Rider", photo: "https://i.pravatar.cc/150?img=7" },
  { id: 8, message: "Delivered my products to Rangpur on time. Excellent customer support!", name: "Tasnim Ahmed", position: "Small Business Owner", photo: "https://i.pravatar.cc/150?img=8" },
  { id: 9, message: "Very convenient service for sending parcels to Mymensingh. Highly satisfied!", name: "Farhana Begum", position: "Homemaker", photo: "https://i.pravatar.cc/150?img=9" },
  { id: 10, message: "The platform is user-friendly, and deliveries to Jessore are always prompt.", name: "Kamrul Hasan", position: "Merchant", photo: "https://i.pravatar.cc/150?img=10" },
  { id: 11, message: "As a rider, I appreciate the flexible schedule and timely payments!", name: "Shakil Mahmud", position: "Delivery Rider", photo: "https://i.pravatar.cc/150?img=11" },
  { id: 12, message: "Superb service! My packages reached Comilla safely and on time.", name: "Lamia Akter", position: "Student", photo: "https://i.pravatar.cc/150?img=12" }
];
*/

const ReviewSection = () => {
    const [currentIndex, setCurrentIndex] = useState(2); // Start with middle card highlighted
    const dotContainerRef = useRef(null);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    };

    const getCardStyle = (index) => {
        const relativeIndex = index - currentIndex;
        let opacity, translateY, translateX, scale, zIndex;

        if (relativeIndex === 0) {
            // Middle highlighted card
            opacity = 1;
            translateY = -30;
            translateX = 0;
            scale = 1;
            zIndex = 10;
        } else if (relativeIndex === 1 || relativeIndex === -1) {
            // Adjacent full cards
            opacity = 0.5;
            translateY = 10;
            translateX = relativeIndex * 400;
            scale = 0.95;
            zIndex = 5;
        } else if (relativeIndex === 2 || relativeIndex === -2) {
            // Half-visible edge cards
            opacity = 0.2;
            translateY = 30;
            translateX = relativeIndex * 400;
            scale = 0.7;
            zIndex = 3;
        } else {
            // Hidden cards
            opacity = 0;
            translateY = 50;
            translateX = relativeIndex * 400;
            scale = 0.85;
            zIndex = 1;
        }

        return {
            opacity,
            transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
            zIndex,
            transition: 'all 0.5s ease'
        };
    };

    useEffect(() => {
        if (dotContainerRef.current) {
            const dotWidth = 7; // Dot width (3px) + spacing (2px * 2, adjusted for space-x-2)
            const containerWidth = 150; // Container width
            const maxVisibleDots = Math.floor(containerWidth / dotWidth);
            const scrollOffset = (currentIndex - maxVisibleDots / 2) * dotWidth;

            // Ensure scroll stays within bounds
            const maxScroll = dotContainerRef.current.scrollWidth - containerWidth;
            const scrollPosition = Math.max(0, Math.min(scrollOffset, maxScroll));

            dotContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    return (
        <section className="py-16 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div data-aos="zoom-out-down" data-aos-easing="ease-out-cubic"
                    data-aos-duration="4000">
                    <img src={image} alt="" className='mx-auto' />
                </div>
                <div className='text-center space-y-6 mb-10 max-w-3xl mx-auto'>
                    <h2 className="text-[40px] font-extrabold text-[#03373D]">
                        What our customers are sayings
                    </h2>
                    <p className='text-[#606060] text-base'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
                </div>
                <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="absolute w-96 bg-white rounded-2xl shadow-lg p-8"
                            style={getCardStyle(index)}
                        >
                            <div className="flex flex-col h-full">
                                {/* Quotation Mark */}
                                <div className="mb-4">
                                    <span className="text-6xl font-serif text-[#C3DFE2]">
                                        “
                                    </span>
                                </div>
                                {/* Review Message and Customer Info */}
                                <div className="flex items-center flex-col gap-3">
                                    <p className="text-[#606060] text-lg pr-6 flex-1">
                                        {review.message}
                                    </p>
                                    <div className="divider opacity-25 divider-neutral"></div>
                                    <div className="pl-4 flex w-full items-center">
                                        <img
                                            src={review.photo}
                                            alt={review.name}
                                            className="w-16 h-16 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <h4 className="text-[#03373D] font-extrabold text-xl">
                                                {review.name}
                                            </h4>
                                            <p className="text-[#606060] text-base font-medium">
                                                {review.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-8">
                    <motion.button
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={handlePrev}
                        className="btn btn-circle border-0 bg-white outline-0 text-[#03373D] hover:bg-[#CAEB66] mr-4"
                    >
                        ❮
                    </motion.button>
                    <div
                        ref={dotContainerRef}
                        className="w-[250px] overflow-x-hidden flex-shrink-0"
                    >
                        <div className="flex space-x-2">
                            {reviews.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${index === currentIndex ? 'bg-[#03373D]' : 'bg-[#94C6CB]'
                                        }`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <motion.button
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={handleNext}
                        className="btn btn-circle border-0 bg-white outline-0 text-[#03373D] hover:bg-[#CAEB66] ml-4"
                    >
                        ❯
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;