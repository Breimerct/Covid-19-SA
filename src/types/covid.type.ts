export type CovidData = {
  active: number;
  activePerOneMillion: number;
  cases: number;
  casesPerOneMillion: number;
  continent: string;
  country: string | null;
  countryInfo: CountryInfo;
  critical: number;
  criticalPerOneMillion: number;
  deaths: number;
  deathsPerOneMillion: number;
  population: number;
  recovered: number;
  recoveredPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  todayCases: number;
  todayDeaths: number;
  todayRecovered: number;
  vaccine: number;
  vaccineError?: string;
  updated: number;
};

export type VaccineResponse = {
  country: string;
  timeline: Record<string, number>;
};

export type CountryInfo = {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
};

export type TestChartItem = {
  country: string;
  iso3: string;
  value: number;
};
