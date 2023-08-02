import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { BiArrowBack } from 'react-icons/bi';
import LOCK from '../../../assets/idk.jpg';

const CheckoutForm = ({ id, repeativity, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      throw new Error('Stripe or Elements not initialized.');
    }

    setIsProcessing(true);

    try {
      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      const response = await fetch('http://localhost:5000/create_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ repeativity, amount, payment_method_id: paymentMethod.paymentMethod.id }),
      });

      const data = await response.json();

      if (response.ok) {
        const confirm = await stripe.confirmCardPayment(data.client_secret);

        if (confirm.error) {
          setErrorMessage('Payment unsuccessful! ' + confirm.error.message);
        } else {
          setErrorMessage('Payment successful! Subscription is active.');
        }
      } else {
        setErrorMessage('Failed to create subscription. Please check your code or try again later. ');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const options = {
    style: {
      base: {
        fontSize: '20px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        width: '100%',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    showIcon: true,
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img src={LOCK} className="h-4/5 w-4/5 object-cover rounded-lg brightness-75" alt="lock image" />
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center">
          <p>Unlock Your Imagination 🌟</p>
          <p>Explore Endless Possibilities 🚀</p>
          <p>Let Your Dreams Take Flight 🌌</p>
        </div>
      </div>
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-4/5 p-8 bg-white rounded-lg shadow-md">
          <a href='/app/billing' className="flex items-center mb-4 text-primary">
            <BiArrowBack className="mr-2" /> Back to Dashboard
          </a>
          <p className="text-3xl font-bold text-primary">
              ✨aidvi <span className="font-normal text-xl">|</span> <em className="font-normal text-xl">Subscription</em>
          </p>
          <div>
            <div className="mb-8">
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Subscription details:</h2>
                <div className="mt-2">
                  <p>Price: <span className="font-bold text-secondary">{amount/100}$</span></p>
                  <p>Recurrent: {repeativity=="month" ? 'monthly' : 'yearly'}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold mb-4">Card details:</h1>
              <div className="border rounded-lg p-3 mb-4">
                <CardElement options={options} />
              </div>
              <button
                className="w-full py-3 bg-secondary rounded-md text-white font-semibold disabled:opacity-50"
                disabled={!stripe || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Submit'}
              </button>
            </form>
            {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
