import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GlobalButton from '../buttons/GlobalButton';

import GreenWhiteCheck from "@/assets/svgs/white-check.svg";
import GreenBlackCheck from "@/assets/svgs/black-check.svg";

type props = {
  title: string;
  price: number;
  billingCycle: string;
  features: string[];
  isPopular: boolean;
  className?: string;
  annualTotal?: number;
  discountPercent?: number;
  description?: string | null;
  userLimit?: number | null;
  duration?: number;
}

const PricingCard = ({ title, price, billingCycle, features, isPopular, className, annualTotal, discountPercent, description, userLimit, duration }: props) => {

  const router = useRouter();
  const isFree = price === 0;
  const monthlyPrice = Math.round(price);
  const billedAmount = billingCycle === "year" && annualTotal ? annualTotal : price;

  return (
    <div className={`rounded-2xl p-6 md:p-10 ${className} h-full flex flex-col ${isPopular ? 'bg-gray-800 shadow-2xl' : 'bg-white'} transition-all duration-300 shadow-sm`}>

      <div className="text-center mb-6">
        <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${isPopular ? "text-white" : "text-black"}`}>
          {title}
        </h3>

        {description && (
          <p className={`text-base mb-5 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
            {description}
          </p>
        )}

        {discountPercent && discountPercent > 0 && (
          <span className="inline-block bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Save {discountPercent}%
          </span>
        )}

        <div className="mb-5 flex justify-center gap-3 items-baseline">
          <span className={`text-3xl md:text-4xl font-bold ${isPopular ? 'text-white' : 'text-gray-800'}`}>
            ${isFree ? '0' : monthlyPrice}
          </span>
          <span className={`text-base text-left text-[#A6A6A6]`}>
            <p>/ {billingCycle === "year" ? "Month (USD)" : "Month (USD)"}</p>
            <p>${Math.round(billedAmount)} Billed {billingCycle === "year" ? "365-days" : "30-days"}</p>
          </span>
        </div>


        <div className="flex justify-center gap-4 mt-4">
          <span className={`text-base font-medium ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
            {userLimit == null ? 'Unlimited users' : `Up to ${userLimit} users`}
          </span>
          {duration != null && (
            <span className={`text-base font-medium ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
              {duration === 1 ? '1 month' : `${duration} months`}
            </span>
          )}
        </div>
      </div>

      <div className={`border-t-2 border-dashed mb-5 ${isPopular ? 'border-gray-100' : 'border-gray-300'}`} />

      <div className='space-y-4 mb-8'>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Image
              src={isPopular ? GreenWhiteCheck : GreenBlackCheck}
              alt="check"
              width={25}
              height={25}
              className="flex-shrink-0"
            />
            <span className={`text-[15px] md:text-base ${isPopular ? 'text-gray-200' : 'text-gray-700'
              }`}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <GlobalButton onClick={() => router.push("/demo")} title="Book a demo" width="100%" height="52px" font="bold" className="!text-[15px]" borderRadius="8px" />
      </div>
    </div>
  );
};

export default PricingCard;
