import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ApplicationError extends Error {
  info: string;
  status: number;
}


export const fetcher = async (url: string, options?: RequestInit) => {
  const username = process.env.SIPWISE_API_USERNAME || '';
  const password = process.env.SIPWISE_API_PASSWORD || '';
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Basic ${credentials}`,
      'Accept': 'application/hal+json',
      'Content-Type': 'application/json',
    },
  });


  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching the data.',
    ) as ApplicationError;

    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  const data = await res.json();

  if (data._embedded) {
    // Find the first key in _embedded (e.g., 'ngcp:lnpnumbers')
    const embeddedKey = Object.keys(data._embedded)[0];
    return data._embedded[embeddedKey] || data;
  }

  return data;
};
