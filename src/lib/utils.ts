import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

export const setToLocalStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};