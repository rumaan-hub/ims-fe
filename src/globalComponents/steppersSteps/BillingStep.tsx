import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import GlobalInput from '../inputs/GlobalInput';
import GlobalButton from '../buttons/GlobalButton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  token: string;
  onNext: (paymentMethodId?: string) => void;
  onBack?: () => void;
}

// ── Inner form that has access to Stripe hooks ──
const BillingForm = ({ token, onNext, onBack }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [nameOnCard, setNameOnCard] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedCard, setSavedCard] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/ims-checkout/billing/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          if (data.billing_address) {
            const parts = data.billing_address.split(', ');
            setBillingAddress(parts[0] || '');
            setApt(parts[1] || '');
            setCity(parts[2] || '');
            setBillingState(parts[3] || '');
            setZipCode(parts[4] || '');
          }
          if (data.last4) {
            setSavedCard(`${data.card_brand || 'Card'} ending in ${data.last4}`);
          }
        }
      })
      .catch(() => { });
  }, [token]);

  const handleSave = async () => {
    if (!stripe || !elements) return;
    if (!nameOnCard || !billingAddress) {
      setError('Please fill in all required fields.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // Create payment method via Stripe
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            line1: billingAddress,
            line2: apt || undefined,
            city: city || undefined,
            state: billingState || undefined,
            postal_code: zipCode || undefined,
            country: 'US',
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message || 'Card verification failed');
      }

      // Save billing info to backend
      const fullAddress = [billingAddress, apt, city, billingState, zipCode].filter(Boolean).join(', ');
      const res = await fetch(`${API_BASE}/ims-checkout/billing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          card_brand: paymentMethod!.card?.brand || 'unknown',
          last4: paymentMethod!.card?.last4 || '0000',
          expiry_month: paymentMethod!.card?.exp_month || 0,
          expiry_year: paymentMethod!.card?.exp_year || 0,
          billing_address: fullAddress,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Failed (${res.status})`);
      }

      onNext(paymentMethod!.id);
    } catch (err: any) {
      setError(err.message || 'Failed to save billing');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className='text-[17px] md:text-[20px] font-semibold'>Billing Details</p>
      <div className='mt-6 space-y-6'>
        {savedCard && (
          <div className='bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700'>
            Previously saved: {savedCard}. Enter new card details below to update.
          </div>
        )}

        {/* Stripe Card Element */}
        <div className='space-y-1'>
          <p className='text-[13px] text-[#2D2D2D]'>Card Number <span className='text-red-500'>*</span></p>
          <div className='border border-gray-200 rounded-lg px-4 py-3 bg-white'>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '15px',
                    color: '#1e293b',
                    '::placeholder': { color: '#94a3b8' },
                    fontFamily: 'inherit',
                  },
                  invalid: { color: '#ef4444' },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>

        {/* Name on Card */}
        <GlobalInput
          placeholder='Enter Name On Card'
          title='Name On Card'
          width='100%'
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
        />

        {/* Billing Address */}
        <GlobalInput
          placeholder='Enter Billing Address'
          title='Street Address'
          width='100%'
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />
        <GlobalInput
          placeholder='Enter Apt, Suite, Building'
          title='Apt, Suite, Building'
          width='100%'
          required={false}
          value={apt}
          onChange={(e) => setApt(e.target.value)}
        />

        <div className='grid md:grid-cols-3 gap-6 md:gap-4'>
          <GlobalInput
            placeholder='Enter City'
            title='City'
            width='100%'
            required={false}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className='space-y-1'>
            <p className='text-[13px] text-[#2D2D2D]'>State</p>
            <Select value={billingState} onValueChange={setBillingState}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Illinois">Illinois</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <GlobalInput
            placeholder='XXXX'
            title='Zip Code'
            width='100%'
            required={false}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <div className='flex justify-between items-center mt-6'>
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
            onClick={handleSave}
            title={saving ? 'Saving...' : 'Save & Continue →'}
            width='180px'
            disabled={saving || !stripe}
          />
        </div>
      </div>
    </div>
  );
};

// ── Wrapper that loads Stripe and wraps with Elements ──
const BillingStep = ({ token, onNext, onBack }: Props) => {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/ims-checkout/config`)
      .then(res => res.json())
      .then(data => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        } else {
          setLoadError('Payment configuration unavailable');
        }
      })
      .catch(() => setLoadError('Failed to load payment configuration'));
  }, []);

  if (loadError) {
    return (
      <div>
        <p className='text-[17px] md:text-[20px] font-semibold'>Billing Details</p>
        <p className='text-sm text-red-500 mt-4'>{loadError}</p>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div>
        <p className='text-[17px] md:text-[20px] font-semibold'>Billing Details</p>
        <div className='flex items-center justify-center py-12'>
          <div className='w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin' />
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <BillingForm token={token} onNext={onNext} onBack={onBack} />
    </Elements>
  );
};

export default BillingStep;
