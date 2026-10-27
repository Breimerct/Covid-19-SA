import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COUNTRIES_VALUE, SOUTH_AMERICA, type Country } from '../consts';
import {
  fetchContinentData,
  fetchCountryData,
  fetchTestChartData,
  fetchVaccineData,
} from '../services';
import type { CovidData, TestChartItem } from '../types';

type CovidState = {
  country: Country;
  covidData: CovidData | null;
  isLoading: boolean;
  vacctineError: string | null;
  testChartData: TestChartItem[];
  isLoadingTestChart: boolean;
};

type CovidActions = {
  setCountry: (country: Country) => void;
  setCovidData: (data: CovidData) => void;
  setIsLoading: (loading: boolean) => void;
  setTestChartData: (data: TestChartItem[]) => void;
  setIsLoadingTestChart: (loading: boolean) => void;

  resetStore: () => void;
  fetchCovidData: () => Promise<void>;
  fetchTestChartData: () => Promise<void>;
};

const initialValues: CovidState = {
  country: SOUTH_AMERICA,
  covidData: null,
  isLoading: false,
  vacctineError: null,
  testChartData: [],
  isLoadingTestChart: false,
};

export const useCovidStore = create<CovidState & CovidActions>()(
  persist(
    (set, get) => ({
      ...initialValues,

      setCountry: (country: Country) => set({ country: country }),
      setCovidData: data => set({ covidData: data }),
      setIsLoading: loading => set({ isLoading: loading }),
      setTestChartData: data => set({ testChartData: data }),
      setIsLoadingTestChart: loading => set({ isLoadingTestChart: loading }),

      resetStore: () => set({ ...initialValues }),

      fetchCovidData: async () => {
        const _this = get();

        try {
          _this.setIsLoading(true);

          if (SOUTH_AMERICA.value === _this.country.value) {
            const response = await fetchContinentData();
            set({ covidData: response.data });

            return;
          }

          const response = await fetchCountryData(_this.country.value);
          const vaccineResponse = await fetchVaccineData(_this.country.value);

          const vaccineError =
            vaccineResponse.status === 404
              ? 'No Data'
              : (vaccineResponse.errorMessage ?? undefined);
          const vaccine = vaccineError ? 0 : (Object.values(vaccineResponse.data.timeline)[0] ?? 0);

          _this.setCovidData({
            ...response.data,
            vaccine,
            vaccineError,
          });
        } finally {
          _this.setIsLoading(false);
        }
      },

      fetchTestChartData: async () => {
        const _this = get();

        try {
          _this.setIsLoadingTestChart(true);

          const countriesExceptSouthAmerica = COUNTRIES_VALUE.filter(
            ({ value }) => value !== SOUTH_AMERICA.value
          );
          const countryValues = countriesExceptSouthAmerica.map(({ value }) => value);
          const uniqueCountryValues = new Set(countryValues);
          const countries = [...uniqueCountryValues];

          const response = await fetchTestChartData(countries);
          const testChartDataFormatted = response.data
            .map<TestChartItem>(({ country, tests, countryInfo: { iso3 } }) => ({
              country: country || '',
              value: tests,
              iso3,
            }))
            .sort((a, b) => b.value - a.value);

          _this.setTestChartData(testChartDataFormatted);
        } finally {
          _this.setIsLoadingTestChart(false);
        }
      },
    }),
    {
      name: 'covid-store',

      partialize: state => ({
        country: state.country,
      }),
    }
  )
);
