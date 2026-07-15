import React from 'react';

import { ServiceData } from '@/lib/MockData';

import ServiceCard from '../cards/ServiceCard';

const OurServices = () => {
  return (
    <section id="services" className='xl:px-24 lg:px-16 md:px-6 px-4 py-16 bg-[#F8F8F8] flex justify-center'>
      <div className='w-full'>
        <p className='text-center lg:text-4xl md:text-3xl text-2xl font-semibold'>Our Provided Services</p>
        <div className='grid grid-cols-4 max-[1300px]:grid-cols-3 max-[930px]:grid-cols-2 max-[630px]:grid-cols-1 gap-6 max-[1270px]:gap-3 mt-10'>
          {ServiceData.map((card, i) => (
            <div key={i} className='max-w-[300px] max-[370px]:max-w-[290px] mx-auto'>
              <ServiceCard
                iconGroup={card.iconGroup}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;