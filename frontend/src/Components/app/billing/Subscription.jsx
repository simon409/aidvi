import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const stripePromise = loadStripe('pk_test_51NZrjpCW3Jn6BZO0HcDhbvIUdSxhifEzCqBSa0kqG0stBb9JFjVdl313vYcfOX5wPoT7dkp1hFxSKXlTiEcbg0mb00mwt8R0sl');

export default function Subscription() {
  const {id} = useParams()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const repeativity = queryParams.get('repeativity');
  const plan_amount = id == 2 ? (repeativity == 'monthly' ? 3000 : 30000) : (repeativity == 'monthly' ? 10000 : 100000);
  const plan_interval = repeativity == "monthly" ? "month" : "year"

  return (
    <>
      <Elements stripe={stripePromise}>
          <CheckoutForm id={id} repeativity={plan_interval} amount={plan_amount} />
      </Elements>
    </>
  );
};
