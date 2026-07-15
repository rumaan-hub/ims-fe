import React from 'react';
import Image from 'next/image';
import TickIcon from "@/assets/svgs/succes-icon.svg";
import GlobalButton from '../buttons/GlobalButton';

type props = {
  modalClose: () => void;
}

const OrderPlacedSuccessModal = ({ modalClose }: props) => {
  return (
    <div className='text-center'>
      <Image src={TickIcon} alt='' className='mx-auto py-6' />
      <p className='text-[24px] max-lg:text-[20px] max-md:text-[18px] font-semibold'>Your order has been placed!</p>
      <p className='text-sm text-[#33C92D] mt-4'>Your trail will expire on  (26/08/2025)</p>
      <GlobalButton onClick={modalClose} title='Close' className="mt-10" />
    </div>
  );
};

export default OrderPlacedSuccessModal;