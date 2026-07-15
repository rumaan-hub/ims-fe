"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AtSign, Phone } from 'lucide-react';

import GlobalButton from '../buttons/GlobalButton';

import AppLogo from "@/assets/svgs/Dentistry99.svg";
import LinkedinIcon from "@/assets/svgs/linkedin.svg";

const Footer = () => {

  const router = useRouter();

  return (
    <footer className='bg-white py-10 xl:px-24 lg:px-16 md:px-6 px-4 border-t'>
      <div className='mx-auto'>
        <div className='bg-[#33C92D] p-6 rounded-lg'>
          <p className='text-white lg:text-4xl lg:leading-[50px] md:text-2xl text-xl font-semibold mb-6 max-w-xl mx-auto text-center'>Start Growing With Dentistry99 Inventory Today</p>
          <GlobalButton
            title="Book a demo"
            width="130px"
            bgColor="#2D2D2D"
            height='44px'
            font="400"
            className="mx-auto"
            onClick={() => router.push("/demo")}
          />
          <div className='flex justify-center flex-wrap text-white text-sm md:gap-20 sm:gap-6 gap-4 mt-6'>
            <p>30-Day Free Trial</p>
            <p>No Credit Card Required</p>
            <p>Cancel Anytime</p>
          </div>
        </div>
        <div className='mt-8'>
          <Image src={AppLogo} alt="" />
          <p className='text-[#A6A6A6] text-sm mt-2'>2025 Dentistry99, Inc. All rights reserved.</p>
        </div>

        <div className='lg:flex justify-between grid grid-cols-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mt-6'>

          <a href="mailto:contact@dentistry99.com" target='_blank'>
            <div className='relative lg:w-[250px] w-full'>
              <div className='w-full text-[12px] text-gray-500 py-2.5 outline-0 border rounded-md pl-4 pr-10'>contact@dentistry99.com</div>
              <div className='bg-[#2D2D2D] rounded-sm text-center text-white absolute right-1.5 top-1.5 h-[30px] w-[30px] flex justify-center items-center'>
                <AtSign size={18} />
              </div>
            </div>
          </a>

          <a href="tel:+15597777713" target='_blank'>
            <div className='relative lg:w-[250px] w-full'>
              <div className='w-full text-[12px] text-gray-500 py-2.5 outline-0 border rounded-md pl-4 pr-10'>+1 (559) 777-7713</div>
              <div className='bg-[#2D2D2D] rounded-sm text-center text-white absolute right-1.5 top-1.5 h-[30px] w-[30px] flex justify-center items-center'>
                <Phone size={18} />
              </div>
            </div>
          </a>

          <a href='https://www.linkedin.com/company/harazco-ltd/posts/?feedView=all' target='_blank'>
            <div className='relative lg:w-[250px] w-full'>
              <p className='w-full text-[12px] text-gray-500 py-2.5 outline-0 border rounded-md pl-4 pr-10'>LinkedIn</p>
              <div
                className='bg-[#2D2D2D] rounded-sm text-center text-white absolute right-1.5 top-1.5 h-[30px] w-[30px] flex justify-center items-center'
              >
                <Image src={LinkedinIcon} alt='LinkedIn' />
              </div>
            </div>
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;