import React from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import GlobalInput from '../inputs/GlobalInput';
import GlobalButton from '../buttons/GlobalButton';

import VisaCard from "@/assets/svgs/visa-card.svg";
import MasterCard from "@/assets/svgs/master-card.svg";
import PaypalCard from "@/assets/svgs/paypal-card.svg";

type props = {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  nameOnCard: string;
  billingAddress: string;
  apt: string;
  city: string;
  billingState: string;
  zipCode: string;
  onCardNumberChange: (val: string) => void;
  onExpiryMonthChange: (val: string) => void;
  onExpiryYearChange: (val: string) => void;
  onCvcChange: (val: string) => void;
  onNameOnCardChange: (val: string) => void;
  onBillingAddressChange: (val: string) => void;
  onAptChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onBillingStateChange: (val: string) => void;
  onZipCodeChange: (val: string) => void;
  onSave: () => void;
  saving?: boolean;
  error?: string;
}

const BillingFields = ({
  cardNumber,
  expiryMonth,
  expiryYear,
  cvc,
  nameOnCard,
  billingAddress,
  apt,
  city,
  billingState,
  zipCode,
  onCardNumberChange,
  onExpiryMonthChange,
  onExpiryYearChange,
  onCvcChange,
  onNameOnCardChange,
  onBillingAddressChange,
  onAptChange,
  onCityChange,
  onBillingStateChange,
  onZipCodeChange,
  onSave,
  saving,
  error,
}: props) => {

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1 gap-4'>
        <div className='md:col-span-2 relative'>
          <GlobalInput
            placeholder='1234 1234 1234 1234'
            title='Card Number'
            width='100%'
            value={cardNumber}
            onChange={(e) => onCardNumberChange(e.target.value)}
          />
          <div className='flex justify-center items-center gap-2 max-[370px]:gap-0.5 absolute right-4 max-[370px]:right-2 top-8'>
            <Image src={MasterCard} alt='' />
            <Image src={PaypalCard} alt='' />
            <Image src={VisaCard} alt='' />
          </div>
        </div>
        <GlobalInput
          title='Expiry Month'
          placeholder='MM'
          width='100%'
          value={expiryMonth}
          onChange={(e) => onExpiryMonthChange(e.target.value)}
        />
        <GlobalInput
          title='Expiry Year'
          placeholder='YYYY'
          width='100%'
          value={expiryYear}
          onChange={(e) => onExpiryYearChange(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 max-[768px]:grid-cols-1 gap-4'>
        <GlobalInput
          placeholder='CVC'
          title='Security Code'
          width='100%'
          value={cvc}
          onChange={(e) => onCvcChange(e.target.value)}
        />
        <GlobalInput
          placeholder='Enter Name On Card'
          title='Name On Card'
          width='100%'
          value={nameOnCard}
          onChange={(e) => onNameOnCardChange(e.target.value)}
        />
      </div>
      <GlobalInput
        placeholder='Enter Billing Address'
        title='Street Address'
        width='100%'
        value={billingAddress}
        onChange={(e) => onBillingAddressChange(e.target.value)}
      />
      <GlobalInput
        placeholder='Enter Apt, Suits, Building'
        title='Apt, Suits, Building'
        width='100%'
        required={false}
        value={apt}
        onChange={(e) => onAptChange(e.target.value)}
      />

      <div className='grid md:grid-cols-3 gap-6 md:gap-4'>
        <GlobalInput
          placeholder='Enter City'
          title='City'
          width='100%'
          required={false}
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <div className='space-y-1'>
          <p className='text-[13px] text-[#2D2D2D]'>State</p>
          <Select value={billingState} onValueChange={onBillingStateChange}>
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
          onChange={(e) => onZipCodeChange(e.target.value)}
        />
      </div>
      {error && (
        <p className='text-sm text-red-500'>{error}</p>
      )}
      <GlobalButton
        onClick={onSave}
        title={saving ? 'Saving...' : 'Save'}
        width='130px'
        className="ml-auto mt-6"
        disabled={saving}
      />
    </div>
  );
};

export default BillingFields;
