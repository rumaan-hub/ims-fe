"use client";

import React, { useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import { setToLocalStorage } from '@/lib/utils';
import { scheduleDemoRequest } from '@/__Api__/apiCallManeger';
import { State, City } from 'country-state-city';

import Navbar from '@/globalComponents/navbar/Navbar';
import GlobalInput from '@/globalComponents/inputs/GlobalInput';
import GlobalButton from '@/globalComponents/buttons/GlobalButton';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// US states (name + isoCode) from offline dataset — used to drive the
// dependent City dropdown so only the selected state's cities are offered.
const US_STATES = State.getStatesOfCountry('US');

type Slot = { value: string; label: string; available: boolean };

// Searchable, dependent City dropdown (shadcn Popover + Command).
// Only the selected state's cities are passed in via `options`; results are
// filtered by the search box and capped at 100 rendered nodes so large states
// (Texas, California — 2,500+ cities) open and filter without lag.
function CityCombobox({
  value,
  options,
  disabled,
  onChange,
}: {
  value: string;
  options: string[];
  disabled: boolean;
  onChange: (city: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => options.filter((c) => c.toLowerCase().includes(search.trim().toLowerCase())),
    [options, search]
  );
  const visible = filtered.slice(0, 100);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSearch('');
      }}
    >
      <PopoverTrigger asChild>
        <button
          type='button'
          disabled={disabled}
          aria-expanded={open}
          className='text-[13px] rounded-[5px] border focus:outline-none flex items-center justify-between gap-2 border-[#E9E9E9] px-4 w-full disabled:bg-[#F5F5F5] disabled:cursor-not-allowed'
          style={{ height: '42px' }}
        >
          <span className={`truncate text-left ${value ? 'text-black' : 'text-[#A6A6A6] font-[300]'}`}>
            {value || (disabled ? 'Select state first' : 'Select City')}
          </span>
          <ChevronsUpDown className='size-4 shrink-0 opacity-50' />
        </button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-[var(--radix-popover-trigger-width)] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder='Search city…'
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {visible.map((c) => (
                <CommandItem
                  key={c}
                  value={c}
                  onSelect={() => {
                    onChange(c);
                    setSearch('');
                    setOpen(false);
                  }}
                >
                  <Check className={`size-4 ${c === value ? 'opacity-100 text-[#33C92D]' : 'opacity-0'}`} />
                  {c}
                </CommandItem>
              ))}
            </CommandGroup>
            {filtered.length > 100 && (
              <p className='px-3 py-2 text-[12px] text-[#A6A6A6] border-t border-[#E9E9E9]'>
                Showing first 100 — keep typing to narrow.
              </p>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const Demo = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    street_address: '',
    apt: '',
    city: '',
    state: '',        // full state name (sent to the API)
    zip_code: '',
    scheduled_at: '',  // ISO instant of the chosen slot
    notes: '',
  });
  const [stateIso, setStateIso] = useState('');     // drives city lookup
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [restoreRequested, setRestoreRequested] = useState(false);

  // Date + slot picker state
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotMessage, setSlotMessage] = useState('');

  // Cities of the currently selected state (only these are valid/suggested).
  const cityOptions = useMemo<string[]>(
    () => (stateIso ? City.getCitiesOfState('US', stateIso).map((c) => c.name) : []),
    [stateIso]
  );

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
    setWarning('');
  };

  const handleStateChange = (iso: string) => {
    const match = US_STATES.find((s) => s.isoCode === iso);
    setStateIso(iso);
    setForm(prev => ({ ...prev, state: match?.name || '', city: '' }));
    setError('');
  };

  // Min selectable date = today (weekends are rejected by the backend).
  const todayStr = () => new Date().toISOString().slice(0, 10);

  const fetchSlots = async (date: string) => {
    setSlots([]);
    setSlotMessage('');
    setForm(prev => ({ ...prev, scheduled_at: '' }));
    if (!date) return;

    setSlotsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ims-demo/available-slots?date=${date}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSlotMessage('Could not load slots. Please try another date.');
        return;
      }
      if (data.closed) {
        setSlotMessage('Demos run Monday–Friday only. Please choose a weekday.');
        return;
      }
      const list: Slot[] = data.slots || [];
      setSlots(list);
      if (!list.some((s) => s.available)) {
        setSlotMessage('No slots available on this date. Please try another day.');
      }
    } catch {
      setSlotMessage('Could not load slots. Please check your connection and try again.');
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setError('');
    fetchSlots(date);
  };

  const handleSubmit = async () => {
    setError('');
    setWarning('');

    // Validate required fields (apt is optional; demo type removed)
    if (
      !form.email || !form.first_name || !form.last_name ||
      !form.company_name || !form.phone || !form.street_address ||
      !form.city || !form.state || !form.zip_code || !form.scheduled_at
    ) {
      setError('Please fill in all required fields and pick a time slot.');
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate US ZIP (5 digits, or ZIP+4)
    if (!/^\d{5}(-\d{4})?$/.test(form.zip_code.trim())) {
      setError('Please enter a valid ZIP code (e.g., 90210).');
      return;
    }

    // Validate city belongs to the selected state
    if (cityOptions.length > 0 && !cityOptions.some((c) => c.toLowerCase() === form.city.trim().toLowerCase())) {
      setError('Please select a valid city for the chosen state.');
      return;
    }

    // Validate future slot
    if (new Date(form.scheduled_at) <= new Date()) {
      setError('Please select a future time slot.');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }

    setLoading(true);
    try {
      // STEP 1 — Register user
      const registerRes = await fetch(`${API_BASE}/ims/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.toLowerCase().trim(),
          first_name: form.first_name,
          last_name: form.last_name,
          company_name: form.company_name,
          contact_number: form.phone,
          permanent_address: form.street_address,
          city: form.city,
          state: form.state,
          zip_code: form.zip_code,
          agree_to_terms: true,
        }),
      });

      // Always read the response body once
      const registerData = await registerRes.json().catch(() => ({}));

      if (registerRes.status === 409) {
        setError('This email is already registered. Please Sign In.');
        setLoading(false);
        return;
      }

      if (!registerRes.ok) {
        throw new Error(registerData.message || `Registration failed (${registerRes.status})`);
      }

      // Check if this was a restore request (deleted user re-registering)
      if (registerData.message && (registerData.message.includes('restore') || registerData.message.includes('Admin') || registerData.message.includes('admin'))) {
        setRestoreRequested(true);
        setLoading(false);
        return;
      }

      // STEP 2 — Book demo (scheduled_at is already an ISO instant from the slot)
      await scheduleDemoRequest({
        scheduled_at: form.scheduled_at,
        full_name: `${form.first_name} ${form.last_name}`,
        email: form.email.toLowerCase().trim(),
        phone: form.phone,
        company_name: form.company_name,
        notes: form.notes || undefined,
      });

      // STEP 3 — Save and redirect
      setToLocalStorage('demoBooking', JSON.stringify({
        first_name: form.first_name,
        email: form.email,
        scheduled_at: form.scheduled_at,
      }));

      router.push('/demo/success');
    } catch (err: any) {
      if (err?.response?.status === 409) {
        // Slot collision or duplicate booking — refresh slots so the user sees the change
        const msg = err?.response?.data?.message || '';
        if (msg.toLowerCase().includes('slot')) {
          setError('That time slot was just taken. Please pick another slot.');
          if (selectedDate) fetchSlots(selectedDate);
        } else {
          setWarning(msg || 'A demo is already booked with this email or company. Please contact support to reschedule.');
        }
      } else {
        const msg = err?.response?.data?.message || err?.message || 'Something went wrong. Please try again.';
        setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
    } finally {
      setLoading(false);
    }
  };

  if (restoreRequested) {
    return (
      <div>
        <Navbar />
        <div className='p-4 flex justify-center items-center min-h-screen'>
          <div className='max-w-md w-full border p-6 rounded-[10px] shadow-sm text-center'>
            <div className='flex justify-center mb-4'>
              <svg className='w-16 h-16 text-[#33C92D]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <p className='text-[28px] font-semibold text-[#33C92D]'>Request Sent!</p>
            <p className='text-sm text-[#8E95A9] font-[300] mt-3 leading-relaxed'>
              Your restore request has been submitted.<br />
              Please wait for admin approval.<br />
              You will be notified once approved.
            </p>
            <button
              onClick={() => router.push('/')}
              className='mt-6 px-8 py-2.5 bg-[#33C92D] text-white rounded-[5px] font-medium text-sm hover:bg-[#2db827] transition-colors'
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='p-4 flex justify-center items-center min-h-screen'>
        <div className='max-w-md w-full border p-6 rounded-[10px] shadow-sm'>
          <p className='text-[28px] text-center font-semibold text-[#33C92D]'>Book a Demo</p>
          <p className='text-sm text-[#8E95A9] font-[300] text-center mt-3'>See how Dentistry99 can transform your practice</p>
          {warning && (
            <div className='bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm text-center mb-4 mt-4'>
              {warning}
            </div>
          )}
          <div className='space-y-4 mt-5'>

            <GlobalInput
              placeholder='Example@gmail.com'
              title='Email Address'
              type='email'
              width='100%'
              value={form.email}
              onChange={handleChange('email')}
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <GlobalInput
                placeholder='Enter First Name'
                title='First Name'
                width='100%'
                value={form.first_name}
                onChange={handleChange('first_name')}
                validationType='letters'
              />
              <GlobalInput
                placeholder='Enter Last Name'
                title='Last Name'
                width='100%'
                value={form.last_name}
                onChange={handleChange('last_name')}
                validationType='letters'
              />
            </div>

            <GlobalInput
              placeholder='Enter Company Name'
              title='Company Name'
              width='100%'
              value={form.company_name}
              onChange={handleChange('company_name')}
            />

            <GlobalInput
              placeholder='000 000 000'
              title='Phone'
              width='100%'
              value={form.phone}
              onChange={handleChange('phone')}
              validationType='numbers'
            />

            {/* ── Address Fields ── */}
            <GlobalInput
              placeholder='Enter Street Address'
              title='Street Address'
              width='100%'
              value={form.street_address}
              onChange={handleChange('street_address')}
            />

            {/* Suit / Apt / Building — optional */}
            <GlobalInput
              placeholder='Enter Suit, Apt, Building (optional)'
              title='Suit, Apt, Building'
              width='100%'
              required={false}
              value={form.apt}
              onChange={handleChange('apt')}
            />

            {/* State first — drives the City list */}
            <div className='space-y-1'>
              <p className='text-[13px] text-[#2D2D2D] font-[400]'>State<span className='text-[#ff0100]'>*</span></p>
              <Select value={stateIso} onValueChange={handleStateChange}>
                <SelectTrigger className="w-full h-[42px]">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="max-h-[240px]">
                  <SelectGroup>
                    {US_STATES.map(s => (
                      <SelectItem key={s.isoCode} value={s.isoCode}>{s.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* City (depends on State) + Zip */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1'>
                <p className='text-[13px] text-[#2D2D2D] font-[400]'>City<span className='text-[#ff0100]'>*</span></p>
                <CityCombobox
                  value={form.city}
                  options={cityOptions}
                  disabled={!stateIso}
                  onChange={(c) => { setForm(prev => ({ ...prev, city: c })); setError(''); }}
                />
              </div>
              <GlobalInput
                placeholder='90210'
                title='Zip Code'
                width='100%'
                value={form.zip_code}
                onChange={handleChange('zip_code')}
                validationType='numbers'
              />
            </div>

            {/* Preferred Date — weekdays only */}
            <div className='space-y-1 w-full'>
              <label className="text-[13px] text-[#2D2D2D] font-[400]">
                Preferred Date<span className="text-[#ff0100]">*</span>
              </label>
              <input
                type="date"
                min={todayStr()}
                value={selectedDate}
                onChange={handleDateChange}
                className='globalinput-placeholder placeholder:text-[13px] text-[13px] text-black placeholder:text-[#A6A6A6] rounded-[5px] border focus:outline-none block placeholder:font-[300] border-[#E9E9E9] px-4 w-full'
                style={{ height: '42px' }}
              />
            </div>

            {/* Available time slots (Mon–Fri, 9 AM–5 PM ET) */}
            {selectedDate && (
              <div className='space-y-2 w-full'>
                <label className="text-[13px] text-[#2D2D2D] font-[400]">
                  Available Time Slots<span className="text-[#ff0100]">*</span>
                  <span className='text-[#A6A6A6] font-[300]'> (ET)</span>
                </label>

                {slotsLoading && (
                  <p className='text-[13px] text-[#8E95A9] font-[300]'>Loading available slots…</p>
                )}

                {!slotsLoading && slotMessage && (
                  <p className='text-[13px] text-[#8E95A9] font-[300]'>{slotMessage}</p>
                )}

                {!slotsLoading && slots.length > 0 && (
                  <div className='grid grid-cols-3 gap-2'>
                    {slots.map((s) => {
                      const selected = form.scheduled_at === s.value;
                      return (
                        <button
                          key={s.value}
                          type='button'
                          disabled={!s.available}
                          onClick={() => { setForm(prev => ({ ...prev, scheduled_at: s.value })); setError(''); }}
                          className={`h-[38px] rounded-[5px] border text-[13px] transition-colors
                            ${selected
                              ? 'bg-[#33C92D] text-white border-[#33C92D]'
                              : s.available
                                ? 'bg-white text-[#2D2D2D] border-[#E9E9E9] hover:border-[#33C92D] hover:text-[#33C92D]'
                                : 'bg-[#F5F5F5] text-[#C4C4C4] border-[#EFEFEF] line-through cursor-not-allowed'}`}
                          aria-pressed={selected}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div className='space-y-1 w-full'>
              <label className="text-[13px] text-[#2D2D2D] font-[400]">
                Notes
              </label>
              <textarea
                placeholder='Any specific requirements...'
                value={form.notes}
                onChange={handleChange('notes')}
                rows={3}
                className='globalinput-placeholder placeholder:text-[13px] text-[13px] text-black placeholder:text-[#A6A6A6] rounded-[5px] border focus:outline-none block placeholder:font-[300] border-[#E9E9E9] px-4 py-2 w-full resize-none'
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className='flex items-center gap-2 mt-3'>
            <input
              id='agree-terms'
              type="checkbox"
              className='accent-gray-500 h-4 w-4'
              checked={agreed}
              onChange={(e) => { setAgreed(e.target.checked); setError(''); }}
            />
            <label htmlFor="agree-terms" className='text-[#A6A6A6] text-[14px] font-medium max-[375px]:text-[12px]'>
              I agree to <span className='text-[#33C92D]'>Terms & conditions.</span>
            </label>
          </div>

          {/* Error message */}
          {error && (
            <p className='text-red-500 text-sm text-center mt-2'>{error}</p>
          )}

          <GlobalButton
            title={loading ? 'Booking...' : 'Book a Demo'}
            className="mt-3 shadow-sm"
            height='42px'
            disabled={loading}
            onClick={handleSubmit}
          />

          <p className='text-[#2D2D2D] mt-3 text-center text-sm font-medium'>
            Already registered? <span onClick={() => router.push('/login')} className='text-[#33C92D] cursor-pointer'>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
