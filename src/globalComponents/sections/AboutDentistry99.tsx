import React from 'react';
import Image from 'next/image';

import AboutImage from "@/assets/pngs/about.png";

const AboutDentistry99 = () => {
  return (
    <section id="about" className='xl:px-24 lg:px-16 md:px-6 px-4 pt-12 pb-10 flex justify-center'>
      <div className='grid md:grid-cols-2 w-full'>
        <div>
          <div className='relative w-full md:w-[80%]'>
            <Image src={AboutImage} alt="" className="relative z-1 w-full" />
            <div className='bg-[#33C92D] h-full w-full inset-0 absolute -top-3 -left-3 rounded-lg md:rounded-xl' />
          </div>
        </div>
        <div className='my-auto lg:pr-5 max-md:mt-5'>
          <p className='text-black lg:text-4xl md:text-3xl text-2xl font-semibold mb-4'>About Dentistry99</p>
          <p className='text-[#989797] text-[14px] font-[300] lg:text-[16px]'>Dentistry99 is a powerful inventory management platform designed specifically for dental practices. We help dental offices automate their supply chain, manage staff efficiently, and gain real-time insights into their inventory. Our mission is to simplify dental office operations so you can spend more time caring for your patients and less time managing supplies.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutDentistry99;