import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import GlobalInput from '../inputs/GlobalInput';
import GlobalButton from '../buttons/GlobalButton';

type props = {
  officeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  extension: string;
  onOfficeNameChange: (val: string) => void;
  onAddressChange: (val: string) => void;
  onCityChange: (val: string) => void;
  onStateChange: (val: string) => void;
  onZipCodeChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onExtensionChange: (val: string) => void;
  onSave: () => void;
  onBack?: () => void;
  saving?: boolean;
  error?: string;
}

const ShippingFields = ({
  officeName,
  address,
  city,
  state,
  zipCode,
  phone,
  extension,
  onOfficeNameChange,
  onAddressChange,
  onCityChange,
  onStateChange,
  onZipCodeChange,
  onPhoneChange,
  onExtensionChange,
  onSave,
  onBack,
  saving,
  error,
}: props) => {
  return (
    <div>
      <div className='grid md:grid-cols-2 gap-6 md:gap-4'>
        <GlobalInput
          placeholder='Enter Office Name'
          title='Office Name'
          width='100%'
          value={officeName}
          onChange={(e) => onOfficeNameChange(e.target.value)}
        />
        <GlobalInput
          placeholder='Enter Street Address'
          title='Street Address'
          width='100%'
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
        />
      </div>
      <div className='grid md:grid-cols-3 gap-6 md:gap-4 mt-6'>
        <GlobalInput
          placeholder='Enter City'
          title='City'
          width='100%'
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
        />
        <div className='space-y-1'>
          <p className='text-[13px] text-[#2D2D2D]'>State<span className='text-[#ff0100]'>*</span></p>
          <Select value={state} onValueChange={onStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Texas">Texas</SelectItem>
                <SelectItem value="Florida">Florida</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Illinois">Illinois</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <GlobalInput
          placeholder='XXXX'
          title='Zip Code'
          width='100%'
          value={zipCode}
          onChange={(e) => onZipCodeChange(e.target.value)}
        />
        <GlobalInput
          placeholder='xxx xxx xxxx'
          title='Phone'
          width='100%'
          required={false}
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
        <GlobalInput
          placeholder='XXX'
          title='Extension'
          width='100%'
          required={false}
          value={extension}
          onChange={(e) => onExtensionChange(e.target.value)}
        />
      </div>
      {error && (
        <p className='text-sm text-red-500 mt-4'>{error}</p>
      )}
      <div className='flex justify-between items-center mt-6'>
        {onBack ? (
          <GlobalButton
            onClick={onBack}
            title='← Back'
            width='130px'
            bgColor='#ffffff'
            color='#374151'
            borderWidth='1px'
            borderColor='#d1d5db'
          />
        ) : <div />}
        <GlobalButton
          onClick={onSave}
          title={saving ? 'Saving...' : 'Save & Continue →'}
          width='180px'
          disabled={saving}
        />
      </div>
    </div>
  );
};

export default ShippingFields;
