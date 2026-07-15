"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage } from '@/lib/utils';

import Navbar from '@/globalComponents/navbar/Navbar';
import GlobalButton from '@/globalComponents/buttons/GlobalButton';

interface DemoBooking {
  first_name: string;
  email: string;
  scheduled_at: string;
}

const DemoSuccess = () => {
  const router = useRouter();
  const [booking, setBooking] = useState<DemoBooking | null>(null);

  useEffect(() => {
    const raw = getFromLocalStorage('demoBooking');
    if (raw) {
      try {
        setBooking(JSON.parse(raw));
      } catch {
        setBooking(null);
      }
    }
  }, []);

  const formatDateTime = (val: string) => {
    try {
      return new Date(val).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return val;
    }
  };

  return (
    <div>
      <Navbar />
      <div className='p-4 flex justify-center items-center min-h-screen'>
        <div className='max-w-md w-full border p-6 rounded-[10px] shadow-sm'>

          {/* Green checkmark circle */}
          <div className='flex justify-center mb-4'>
            <div className='w-20 h-20 rounded-full bg-[#33C92D] flex items-center justify-center'>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <p className='text-[28px] text-center font-semibold text-[#33C92D]'>Demo Booked Successfully!</p>
          <p className='text-sm text-[#8E95A9] font-[300] text-center mt-3'>
            We&apos;ll contact you shortly to confirm your demo
          </p>

          {/* Booking details */}
          {booking && (
            <div className='mt-6 space-y-3 bg-[#F9F9F9] rounded-[8px] p-4'>
              <div className='flex justify-between items-center'>
                <span className='text-[13px] text-[#8E95A9]'>Name</span>
                <span className='text-[13px] text-[#2D2D2D] font-medium'>{booking.first_name}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[13px] text-[#8E95A9]'>Email</span>
                <span className='text-[13px] text-[#2D2D2D] font-medium'>{booking.email}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[13px] text-[#8E95A9]'>Date & Time</span>
                <span className='text-[13px] text-[#2D2D2D] font-medium text-right'>{formatDateTime(booking.scheduled_at)}</span>
              </div>
            </div>
          )}

          <GlobalButton
            title='Back to Home'
            className="mt-6 shadow-sm"
            height='42px'
            onClick={() => router.push('/')}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoSuccess;
