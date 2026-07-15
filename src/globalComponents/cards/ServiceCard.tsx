import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


type Props = {
  iconGroup: string | StaticImport;
  title: string;
  description: string;
}

const ServiceCard = ({ iconGroup, title, description }: Props) => {
  return (
    <div className='relative w-full flex items-center rounded-[12px] pl-8 pr-4 min-h-[270px]'>
      <Image src={iconGroup} alt='icon' className='absolute top-0 left-0' />
      <div className='relative '>
        <p className='lg:text-[18px] text-[16px] font-semibold text-black'>{title}</p>
        <p className='text-[#A6A6A6] text-sm max-[400px]:text-[12px] mt-3 font-[300]'>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;