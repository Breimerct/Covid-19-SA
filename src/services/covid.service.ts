import type { CovidData, VaccineResponse } from '../types';
import { httpClient } from '../utils';

export const fetchContinentData = async () => {
  return await httpClient.get<CovidData>('continents/south america');
};

export const fetchCountryData = async (country: string) => {
  return await httpClient.get<CovidData>(`countries/${country}`);
};

export const fetchVaccineData = async (country: string) => {
  return await httpClient.get<VaccineResponse>(`vaccine/coverage/countries/${country}?lastdays=1`);
};

export const fetchTestChartData = async (countries: string[]) => {
  const countriesString = countries.join(',');

  return await httpClient.get<CovidData[]>(`countries/${countriesString}?lastdays=30`);
};
