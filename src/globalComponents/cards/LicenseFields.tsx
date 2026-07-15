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
  licenseType: string;
  licenseNumber: string;
  state: string;
  expiryDate: string;
  onLicenseTypeChange: (val: string) => void;
  onLicenseNumberChange: (val: string) => void;
  onStateChange: (val: string) => void;
  onExpiryDateChange: (val: string) => void;
  onSave: () => void;
  saving?: boolean;
  error?: string;
}

const LicenseFields = ({
  licenseType,
  licenseNumber,
  state,
  expiryDate,
  onLicenseTypeChange,
  onLicenseNumberChange,
  onStateChange,
  onExpiryDateChange,
  onSave,
  saving,
  error,
}: props) => {
  return (
    <div className='grid md:grid-cols-2 gap-6'>
      <GlobalInput
        placeholder='e.g. DEA, State, NPI'
        title='License Type'
        width='100%'
        value={licenseType}
        onChange={(e) => onLicenseTypeChange(e.target.value)}
      />
      <GlobalInput
        placeholder='xxxxxxxx1234'
        title='License Number'
        width='100%'
        value={licenseNumber}
        onChange={(e) => onLicenseNumberChange(e.target.value)}
      />
      <div className='space-y-1'>
        <p className='text-[13px] text-[#2D2D2D]'>State <span className='text-[#ff0100]'>*</span></p>
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
        type='date'
        title='Expiration Date'
        width='100%'
        value={expiryDate}
        onChange={(e) => onExpiryDateChange(e.target.value)}
      />
      {error && (
        <div className='md:col-span-2'>
          <p className='text-sm text-red-500'>{error}</p>
        </div>
      )}
      <div className='md:col-span-2 flex justify-end mt-3'>
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

export default LicenseFields;
