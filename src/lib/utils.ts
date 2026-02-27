import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API URL - empty for both dev and prod (API routes are served at /api/*)
export const API_URL = import.meta.env.VITE_API_URL || '';

// Website URL for QR code and sharing (canonical domain)
export const SITE_URL = 'https://hexastack.in';
