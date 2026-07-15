"use client"
import { create } from 'zustand';
import toast from 'react-hot-toast';
import { createJSONStorage, persist } from 'zustand/middleware';

export const authStore = create<any>()(

  persist(
    (set) => ({
      user: null,
      signedupUser: null,
      error: null,
      loading: false,
      isLoggedIn: false,
      loadingSignup: false,
      loadingStripe: false,
      selectedVendor: null,
      loadingUpdate: false,
      verifyEmailLoading:false,
      vendorByIDError: null,
      loadingLogin: false,
      vendorByIDLoading: false,
      updatePasswordLoading: false,
      resetPasswordLoading: false,
      forgetLoading: false,


      clearError: () => set({ error: null }),
      setIsLoggedIn: (status: boolean) => set({ isLoggedIn: status }),

    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
