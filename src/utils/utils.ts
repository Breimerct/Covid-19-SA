import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { COUNTRIES, SOUTH_AMERICA, type Country } from '../consts';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const toCountrySlug = (value: string): string => value.trim().toLowerCase().replace(/\s+/g, '-');

export const getCountryFromPath = (pathname: string): Country | null => {
  try {
    const routeSlug = decodeURIComponent(pathname)
      .replace(/^\/+|\/+$/g, '')
      .toLowerCase();

    if (!routeSlug) return SOUTH_AMERICA;

    return (
      Object.values(COUNTRIES).find(country => toCountrySlug(country.value) === routeSlug) ?? null
    );
  } catch {
    return null;
  }
};

export const getCountryPath = (country: Country): string =>
  country.value === SOUTH_AMERICA.value
    ? '/'
    : `/${encodeURIComponent(toCountrySlug(country.value))}`;
