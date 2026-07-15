"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import LoginAuth from "@/assets/pngs/login-auth.png";
import GlobalInput from '@/globalComponents/inputs/GlobalInput';
import GlobalButton from '@/globalComponents/buttons/GlobalButton';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL;

const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ims/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
        return;
      }
      const token = data.token?.access_token || data.token;
      const user = data.data;
      if (token) {
        localStorage.setItem('accessToken', token);
        if (user?.is_system_admin === true) {
          window.location.href = `${DASHBOARD_URL}/system-admin/home?token=${encodeURIComponent(token)}`;
        } else {
          window.location.href = `${DASHBOARD_URL}/?token=${encodeURIComponent(token)}`;
        }
      } else {
        setError('Unexpected response from server');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid md:grid-cols-2 h-screen p-3'>
      <div className='relative max-md:hidden'>
        <Image src={LoginAuth} alt='auth' fill objectFit='cover' className='rounded-md' />
      </div>
      <div className='flex justify-center items-center md:pl-4'>
        <div className='max-w-md w-full border rounded-[10px] shadow p-6'>
          <p className='text-[28px] max-[420px]:text-[22px] text-center font-semibold'>Sign in to <span className='text-[#33C92D]'>Dentistry99</span></p>
          <p className='text-sm text-[#8E95A9] text-center'>Welcome Back</p>
          <GlobalInput
            placeholder='Example@gmail.com'
            title='Email Address'
            width='100%'
            className="mt-6"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setEmail(e.target.value)}
          />
          <GlobalInput
            placeholder='*********'
            title='Password'
            width='100%'
            className="mt-6"
            type='password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setPassword(e.target.value)}
          />
          <div className='flex items-center gap-2 mt-3'>
            <input id='remember-me' type="checkbox" className='accent-gray-500 h-4 w-4' />
            <label htmlFor="remember-me" className='text-[#A6A6A6] text-sm'>Remember  Me</label>
          </div>
          {error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
          <GlobalButton
            title={loading ? 'Signing In...' : 'Sign In'}
            className="mt-3"
            height='42px'
            onClick={handleLogin}
          />
          <div className='text-sm text-center mt-2'>
            <span className='text-[#A6A6A6]'>Don&apos;t have an account?</span>
            <span onClick={() => router.push("/register")} className='underline ml-2 cursor-pointer max-[380px]:block'>Create Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
