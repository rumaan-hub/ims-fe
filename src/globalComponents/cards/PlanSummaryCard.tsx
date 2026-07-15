import React from 'react';
import Image from 'next/image';

import MasterCard from "@/assets/svgs/master-card.svg";
import PaypalCard from "@/assets/svgs/paypal-card.svg";
import VisaCard from "@/assets/svgs/visa-card.svg";

type props = {
  planName?: string;
  billingCycle?: string;
  finalAmount?: number;
  discountPercentage?: number;
}

const PlanSummaryCard = ({ planName, billingCycle, finalAmount, discountPercentage }: props) => {
  const displayCycle = billingCycle === 'annual' ? 'Annual' : 'Monthly';
  const displayAmount = finalAmount != null ? `$${finalAmount.toFixed(2)}` : '--';
  const displayDiscount = discountPercentage != null ? `${discountPercentage}%` : '0%';
  const periodLabel = billingCycle === 'annual' ? '/Year' : '/Month';

  return (
    <div className='border rounded-lg'>
      <div className='p-4'>
        <p className='text-[16px] md:text-[20px] font-semibold text-[#2D2D2D]'>Your Plan Summary</p>
        <p className='mt-5 text-[13px] font-[300] text-[#989797]'>Free 30-days trail, Cancel any time</p>
        <p className='mt-2 text-[13px] font-[300] text-[#989797]'>We&apos;ll reminder you before your trail end.</p>
      </div>

      <div className='p-4 text-[12px] flex justify-between items-end border-b'>
        <div>
          <p className='text-[#2D2D2D] font-medium'>Free Trail</p>
          <p className='text-[#989797] mt-1'>30/Days</p>
        </div>
        <p className='text-[#989797]'>Free</p>
      </div>
      <div className='text-[12px] flex justify-between items-end px-4 pt-5 pb-1 border-b'>
        <p className='text-[#2D2D2D] font-medium'>Subscription:</p>
        <div>
          <p className='text-[#2D2D2D]'>{displayCycle}</p>
          <p className='text-[#989797]'>{displayAmount}</p>
        </div>
      </div>
      <div className='text-[12px] flex justify-between px-4 pt-5 pb-1 border-b'>
        <p className='text-[#2D2D2D] font-medium'>Plan:</p>
        <p className='text-[#989797]'>{planName || '--'}</p>
      </div>
      <div className='text-[12px] flex justify-between px-4 pt-5 pb-1 border-b'>
        <p className='text-[#2D2D2D] font-medium'>Discount:</p>
        <p className='text-[#989797]'>{displayDiscount}</p>
      </div>
      <div className='text-[12px] flex justify-between px-4 pt-5 pb-1 border-b'>
        <p className='text-[#2D2D2D] font-medium'>Tax:</p>
        <p className='text-[#989797]'>0%</p>
      </div>
      <div className='flex justify-between gap-4 px-4 pt-5 pb-1'>
        <p className='text-[#2D2D2D] font-medium text-[12px]'>Sub Total:</p>
        <p className='text-[12px] text-[#989797]'>{displayAmount}{periodLabel}</p>
      </div>
      <div className='p-4'>
      </div>
      <div className='flex justify-center items-center gap-4 pb-4'>
        <Image src={MasterCard} alt='' />
        <Image src={PaypalCard} alt='' />
        <Image src={VisaCard} alt='' />
      </div>
    </div>
  );
};

export default PlanSummaryCard;
