import React, { useState, useEffect } from 'react';
import LicenseFields from '../cards/LicenseFields';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type props = {
  token: string;
  onNext: () => void;
}

const LicenseStep = ({ token, onNext }: props) => {
  const [licenseType, setLicenseType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [state, setState] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/ims-checkout/license/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.found) {
          setLicenseType(data.license_type || '');
          setLicenseNumber(data.license_number || '');
          setState(data.state || '');
          if (data.expiry_date) {
            setExpiryDate(data.expiry_date.substring(0, 10));
          }
        }
      })
      .catch(() => {});
  }, [token]);

  const handleSave = async () => {
    if (!licenseType || !licenseNumber || !state || !expiryDate) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/ims-checkout/license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          license_type: licenseType,
          license_number: licenseNumber,
          state,
          expiry_date: expiryDate,
          status: 'active',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Failed (${res.status})`);
      }
      onNext();
    } catch (err: any) {
      setError(err.message || 'Failed to save license');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <p className='text-[16px] md:text-[20px] font-semibold'>License Details</p>
      <div className='mt-6'>
        <LicenseFields
          licenseType={licenseType}
          licenseNumber={licenseNumber}
          state={state}
          expiryDate={expiryDate}
          onLicenseTypeChange={setLicenseType}
          onLicenseNumberChange={setLicenseNumber}
          onStateChange={setState}
          onExpiryDateChange={setExpiryDate}
          onSave={handleSave}
          saving={saving}
          error={error}
        />
      </div>
    </div>
  );
};

export default LicenseStep;
