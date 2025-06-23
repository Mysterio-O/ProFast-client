import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const questionNAnswers = [
        {
            id: 1,
            question: 'How do I create an account?',
            answer: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
        },
        {
            id: 2,
            question: 'I forgot my password. What should I do?',
            answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
            id: 3,
            question: 'How do I update my profile information?',
            answer: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
        }
    ];

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mb-10 md:mb-24">
            <div className="space-y-6 text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-[40px] text-[#03373D] font-extrabold">
                    Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-[#606060]">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-10">
                {questionNAnswers.map((obj, index) => (
                    <div
                        key={obj.id}
                        className={`rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${openIndex === index ? 'bg-[#03373D]/30' : 'bg-white'
                            }`}
                        onClick={() => handleToggle(index)}
                    >
                        {/* Question + arrow */}
                        <div className="flex justify-between items-center p-4 font-semibold text-[#03373D]">
                            <span>{obj.question}</span>
                            <span
                                className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                            >
                                ▼
                            </span>
                        </div>

                        {/* Answer */}
                        {openIndex === index && (
                            <div className="bg-[#03373D]/30 text-black text-sm p-4 transition-all duration-300">
                                {obj.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center">
                <div className='flex gap-2 items-center group'>
                    <button className="bg-[#CAEB66] btn rounded-2xl font-bold text-black border-0 px-8 py-4 group-hover:scale-110 transition-all duration-300">
                        Show More FAQs
                    </button>
                    <span
                        className='text-[#CAEB66] bg-black rounded-full p-2 -rotate-45 group-hover:rotate-0 transition-all duration-300'>
                        <FaArrowRight size={40} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
