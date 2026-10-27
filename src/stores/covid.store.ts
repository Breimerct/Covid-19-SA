import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SOUTH_AMERICA, type Country } from '../consts';
import { fetchContinentData, fetchCountryData, fetchVaccineData } from '../services';
import type { CovidData } from '../types';

type CovidState = {
  country: Country;
  covidData: CovidData | null;
  isLoading: boolean;
  vacctineError: string | null;
};

type CovidActions = {
  setCountry: (country: Country) => void;
  setIsLoading: (loading: boolean) => void;

  resetStore: () => void;
  fetchCovidData: () => Promise<void>;
};

const initialValues: CovidState = {
  country: SOUTH_AMERICA,
  covidData: null,
  isLoading: false,
  vacctineError: null,
};

export const useCovidStore = create<CovidState & CovidActions>()(
  persist(
    (set, get) => ({
      ...initialValues,

      setCountry: (country: Country) => set({ country: country }),
      setIsLoading: loading => set({ isLoading: loading }),

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

          const vaccine =
            vaccineResponse.status === 404 ? 0 : Object.values(vaccineResponse.data.timeline)[0];
          const vaccineError = vaccineResponse.status === 404 ? 'No Data' : undefined;

          vaccineResponse.errorMessage && console.error(vaccineResponse.errorMessage);
          set({
            covidData: {
              ...response.data,
              vaccine,
              vaccineError,
            },
          });
        } finally {
          _this.setIsLoading(false);
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
