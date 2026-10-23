import type { CovidData } from '../types';
import { httpClient } from '../utils';

export const fetchContinentData = async () => {
  return await httpClient.get<CovidData>('continents/south america');
};

export const fetchCountryData = async (country: string) => {
  return await httpClient.get<CovidData>(`countries/${country}`);
};
