import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const { parcelId } = useParams();
    // console.log(parcelId);

    const { isPending, data: parcelInfo = {}, isError } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel/${parcelId}`)
            return res.data
        }
    })

    if (isPending) return '....loading'

    // console.log('parcel info->', parcelInfo);
    // console.log(isError, isPending, error);
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    // console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // step-1 validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setError(error.message);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
            // step-2 create payment intent
            const res = await axiosSecure.post("/create-payment-intent", {
                amount: amountInCents,
                paymentMethodId: paymentMethod.id,
                parcelId
            });
            // console.log(res);
            const clientSecret = res.data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
            } else if (paymentIntent.status === 'succeeded') {
                setError('');
                // ✅ Success logic here
                console.log('Payment succeeded:', paymentIntent);
                const transactionId = paymentIntent.id;

                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: paymentIntent.payment_method_types
                }

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Parcels',
                    });
                    navigate('/dashboard/myParcels');
                }

            }
        }






    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded" />
                <button
                    type='submit'
                    disabled={!stripe}
                    className="btn btn-primary text-black w-full" this >Pay ${amount}</button>
                {
                    error && <p className="text-red-500 text-center">{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;