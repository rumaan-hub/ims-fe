import React from 'react';
import Image from 'next/image';

import DotsImg from "@/assets/pngs/dots.png";
import LaptopImg from "@/assets/svgs/laptop.svg";
import StarIcon from "@/assets/svgs/star-icon.svg";

const VideoSection = () => {
  return (
    <div id="how-it-works" className='flex justify-center py-10 relative overflow-hidden'>
      <Image src={DotsImg} alt='' className='absolute max-md:hidden -left-6 top-20 z-10' />
      <Image src={DotsImg} alt='' className='absolute max-md:hidden -right-6 bottom-20' />
      <div className='relative'>
        <Image src={LaptopImg} alt='image' className='w-[95vw] md:w-[70vw]' />
        <div className='bg-white rounded-[10px] absolute inset-0 top-[6%] bottom-[10%] left-[12.5%] right-[12%]'>
          <iframe
            className='h-full w-full rounded-[10px]'
            src="https://www.youtube.com/embed/XNLnf10TZf4?autoplay=1&mute=1&loop=1&playlist=XNLnf10TZf4&controls=0&modestbranding=1&rel=0&disablekb=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          >
          </iframe>
        </div>
        <Image src={StarIcon} alt='icon' className='absolute max-xl:hidden right-12 top-20' />
        <Image src={StarIcon} alt='icon' height={20} className='absolute max-xl:hidden right-16 bottom-[250px]' />
        <Image src={StarIcon} alt='icon' height={20} className='absolute max-xl:hidden left-20 top-[250px]' />
        <Image src={StarIcon} alt='icon' className='absolute max-xl:hidden bottom-28 left-16' />
      </div>
    </div>
  );
};

export default VideoSection;