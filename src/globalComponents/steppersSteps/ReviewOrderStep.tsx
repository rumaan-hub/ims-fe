import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import GlobalButton from '../buttons/GlobalButton';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  token: string;
  paymentMethodId?: string;
  onBack?: () => void;
}

// ── Inner component with Stripe hooks ──
const ReviewOrderInner = ({ token, paymentMethodId, onBack }: Props) => {
  const stripe = useStripe();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = async () => {
    if (!stripe) {
      setError('Payment system not ready. Please wait...');
      return;
    }

    setPlacing(true);
    setError('');

    try {
      // Step 1 — Create PaymentIntent on backend
      const intentRes = await fetch(`${API_BASE}/ims-checkout/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!intentRes.ok) {
        const data = await intentRes.json().catch(() => ({}));
        throw new Error(data.message || `Payment setup failed (${intentRes.status})`);
      }
      const { clientSecret } = await intentRes.json();

      // Step 2 — Confirm payment with Stripe using the saved payment method
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });
      if (stripeError) {
        throw new Error(stripeError.message || 'Payment failed');
      }

      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment was not completed');
      }

      // Step 3 — Confirm order on backend (verified server-side)
      const confirmRes = await fetch(`${API_BASE}/ims-checkout/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, payment_intent_id: paymentIntent.id }),
      });
      if (!confirmRes.ok) {
        const data = await confirmRes.json().catch(() => ({}));
        throw new Error(data.message || `Order confirmation failed (${confirmRes.status})`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (success) {
    return (
      <div className='text-center py-12'>
        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <svg className='w-10 h-10 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Order Confirmed!</h2>
        <p className='text-gray-500 text-sm max-w-md mx-auto'>
          Your admin will activate your account shortly. Check your email.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className='text-[17px] md:text-[20px] font-semibold'>Review Order</p>
      <div className='mt-6'>
        <div className='border rounded-lg p-6 bg-gray-50'>
          <p className='text-sm text-gray-500 mb-4'>
            Please review your details. By clicking &quot;Place Order&quot;, your card will be charged.
          </p>
          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-500'>License</span>
              <span className='text-green-600 font-medium'>Saved</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Shipping</span>
              <span className='text-green-600 font-medium'>Saved</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Billing</span>
              <span className='text-green-600 font-medium'>Saved</span>
            </div>
          </div>
        </div>

        {error && (
          <p className='text-sm text-red-500 mt-4'>{error}</p>
        )}

        <div className='flex justify-between items-center mt-8'>
          {onBack ? (
            <GlobalButton
              onClick={onBack}
              title='← Back'
              width='130px'
              bgColor='#ffffff'
              color='#374151'
              borderWidth='1px'
              borderColor='#d1d5db'
            />
          ) : <div />}
          <GlobalButton
            onClick={handlePlaceOrder}
            title={placing ? 'Processing Payment...' : 'Place Order'}
            width='180px'
            disabled={placing || !stripe}
          />
        </div>
      </div>
    </div>
  );
};

// ── Wrapper that loads Stripe ──
const ReviewOrderStep = ({ token, paymentMethodId, onBack }: Props) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/ims-checkout/config`)
      .then(res => res.json())
      .then(data => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        }
      })
      .catch(() => {});
  }, []);

  if (!stripePromise) {
    return (
      <div>
        <p className='text-[17px] md:text-[20px] font-semibold'>Review Order</p>
        <div className='flex items-center justify-center py-12'>
          <div className='w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin' />
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <ReviewOrderInner token={token} paymentMethodId={paymentMethodId} onBack={onBack} />
    </Elements>
  );
};

export default ReviewOrderStep;
