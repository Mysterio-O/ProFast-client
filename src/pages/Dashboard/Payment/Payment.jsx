import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const stripePromise = loadStripe("pk_test_51RgaV6IcJVpdRuBPOmqLUepqvWPQZ7vvUYo34WPnCDSh3X4vZsL8f84vVioO2DSmgFGxRr2H9KeYYLWShmnr5XGi00I8Op6rQ5");

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;