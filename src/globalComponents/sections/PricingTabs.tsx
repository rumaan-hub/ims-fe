"use client";

import React, { useState, useEffect } from 'react';
import PricingCard from '../cards/PricingCard';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PlanData {
  subscription_plan_id: string;
  plan_name: string;
  price: number;
  duration: number;
  description: string | null;
  features: string[];
  user_limit: number | null;
  billing_cycle: string;
  annual_discount_percentage: number;
  annual_price: number;
}

const PricingTabs = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/ims-subscription/plans`);
        if (res.ok) {
          const data = await res.json();
          setPlans(data);
        }
      } catch { /* ignore */ }
      finally { setLoading(false); }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="pricing" className='bg-[#33C92D] py-16 xl:px-24 lg:px-16 md:px-6 px-4'>
        <div className="mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-white mb-4">Pricing</h1>
            <p className="text-white text-sm mb-8">Book a demo get the current promotional Pricing July</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8 md:gap-6 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl p-4 md:p-8 bg-white h-[400px] animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (plans.length === 0) {
    return (
      <section id="pricing" className='bg-[#33C92D] py-16 xl:px-24 lg:px-16 md:px-6 px-4'>
        <div className="mx-auto w-full">
          <div className="text-center">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-white mb-4">Pricing</h1>
            <p className="text-white text-lg">Coming Soon</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className='bg-[#33C92D] py-16 xl:px-24 lg:px-16 md:px-6 px-4'>
      <div className="mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-white mb-4">
            Pricing
          </h1>
          <p className="text-white text-sm mb-8">
            Book a demo get the current promotional Pricing July
          </p>
          <div className="inline-flex bg-white rounded-full p-1 max-lg:text-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-8 sm:px-12 py-2 rounded-full cursor-pointer font-medium transition-all duration-200 ${!isYearly
                ? 'bg-gray-800 text-white'
                : 'text-gray-800 hover:bg-gray-100'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 sm:px-12 py-2 rounded-full cursor-pointer font-medium transition-all duration-200 ${isYearly
                ? 'bg-gray-800 text-white'
                : 'text-gray-800 hover:bg-gray-100'
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8 md:gap-6 gap-4">
          {plans.map((plan, index) => {
            const monthlyPrice = plan.price;
            const annualMonthlyPrice = plan.annual_price / 12;
            const displayPrice = isYearly ? annualMonthlyPrice : monthlyPrice;
            const annualTotal = plan.annual_price;
            const discount = plan.annual_discount_percentage;

            return (
              <PricingCard
                key={plan.subscription_plan_id}
                title={plan.plan_name}
                price={displayPrice}
                billingCycle={isYearly ? "year" : "month"}
                features={plan.features}
                isPopular={index === 1}
                annualTotal={isYearly ? annualTotal : undefined}
                discountPercent={isYearly && discount > 0 ? discount : undefined}
                description={plan.description}
                userLimit={plan.user_limit}
                duration={plan.duration}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingTabs;
