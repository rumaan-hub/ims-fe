import React, { useState, useEffect } from 'react';
import ShippingFields from '../cards/ShippingFields';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type props = {
  token: string;
  onNext: () => void;
  onBack?: () => void;
}

const ShippingStep = ({ token, onNext, onBack }: props) => {
  const [officeName, setOfficeName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [extension, setExtension] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/ims-checkout/shipping/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          setOfficeName(data.office_name || '');
          setAddress(data.address || '');
          setCity(data.city || '');
          setState(data.state || '');
          setZipCode(data.zip_code || '');
          setPhone(data.phone || '');
          setExtension(data.extension || '');
        }
      })
      .catch(() => {});
  }, [token]);

  const handleSave = async () => {
    if (!officeName || !address || !city || !state || !zipCode) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/ims-checkout/shipping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          office_name: officeName,
          address,
          city,
          state,
          zip_code: zipCode,
          phone: phone || undefined,
          extension: extension || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Failed (${res.status})`);
      }
      onNext();
    } catch (err: any) {
      setError(err.message || 'Failed to save shipping');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className='text-[17px] md:text-[20px] font-semibold'>Shipping Details</p>
      <div className='mt-6'>
        <ShippingFields
          officeName={officeName}
          address={address}
          city={city}
          state={state}
          zipCode={zipCode}
          phone={phone}
          extension={extension}
          onOfficeNameChange={setOfficeName}
          onAddressChange={setAddress}
          onCityChange={setCity}
          onStateChange={setState}
          onZipCodeChange={setZipCode}
          onPhoneChange={setPhone}
          onExtensionChange={setExtension}
          onSave={handleSave}
          onBack={onBack}
          saving={saving}
          error={error}
        />
      </div>
    </div>
  );
};

export default ShippingStep;
