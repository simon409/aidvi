import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export default function Subscription() {
    const { id } = useParams()
    const [isProcessing, setisProcessing] = useState(false)
    const [StripePromise, setStripePromise] = useState(null)
    const [ClientSecret, setClientSecret] = useState("")


    useEffect(() => {
      fetch('http://localhost:5000/config')
      .then(async (r) => {
        const {publishablekey} = await r.json();
        setStripePromise(publishablekey)
      })
    }, [])
    

    const HandelSubmit = async (e) => {
        e.preventDefault();

    }
    return (
        <>
            <h1>Welcome to Aidvi</h1>
            <form id='payment-form' onSubmit={HandelSubmit}>
                <button disabled={isProcessing} id='submit'>
                    <span id='button-test'>
                        {isProcessing ? 'Processing...' : 'Pay now'}
                    </span>
                </button>
            </form>
        </>
    )
}
