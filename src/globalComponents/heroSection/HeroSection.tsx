"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import GlobalButton from '../buttons/GlobalButton';
import HeroImg from "@/assets/pngs/hero-group-img.png";

const HeroSection = () => {

  const router = useRouter();

  return (
    <section className='xl:px-24 lg:px-16 md:px-6 py-10 px-4 bg-[#D7FFD5] flex justify-center'>
      <div className='grid md:grid-cols-2 md:gap-10 min-h-[600px] w-full'>
        <div className='my-auto max-md:order-1'>
          <h1 className='text-[48px] max-[1200px]:text-[36px] max-[950px]:text-[28px] max-[600px]:text-[24px] font-[600] leading-[63px] max-[1200px]:leading-[55px] max-[950px]:leading-[40px] max-[600px]:leading-[36px]'>
            Simple Inventory Management Software <p className='text-[#33C92D]'>The Right Way</p>
          </h1>
          <p className='text-black text-sm mt-4'>Streamline your dental practice operations with Dentistry99 — the all-in-one inventory management solution built for modern dental offices. Save time, reduce waste, and focus on patient care.</p>
          <div>
            <div className="flex gap-4 mt-6">
              <GlobalButton onClick={() => router.push("/demo")} title="Book a demo" width="137px" font="400" height='42px' />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <Image src={HeroImg} alt='img' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;