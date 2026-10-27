export type Country = {
  label: string;
  shortName?: string;
  value: string;
  flag: string;
};

export const COUNTRIES: Record<string, Country> = {
  'South America': {
    label: 'South America',
    value: 'south america',
    flag: '/flags/south_america.webp',
  },
  Colombia: {
    label: 'Colombia',
    shortName: 'col',
    value: 'colombia',
    flag: '/flags/colombia.webp',
  },
  Brazil: {
    label: 'Brazil',
    shortName: 'bra',
    value: 'brazil',
    flag: '/flags/brazil.webp',
  },
  Argentina: {
    label: 'Argentina',
    shortName: 'arg',
    value: 'argentina',
    flag: '/flags/argentina.webp',
  },
  Chile: {
    label: 'Chile',
    shortName: 'chl',
    value: 'chile',
    flag: '/flags/chile.webp',
  },
  Venezuela: {
    label: 'Venezuela',
    shortName: 'ven',
    value: 'venezuela',
    flag: '/flags/venezuela.webp',
  },
  Peru: {
    label: 'Peru',
    shortName: 'per',
    value: 'peru',
    flag: '/flags/peru.webp',
  },
  Ecuador: {
    label: 'Ecuador',
    shortName: 'ecu',
    value: 'ecuador',
    flag: '/flags/ecuador.webp',
  },
  Bolivia: {
    label: 'Bolivia',
    shortName: 'bol',
    value: 'bolivia',
    flag: '/flags/bolivia.webp',
  },
  Paraguay: {
    label: 'Paraguay',
    shortName: 'pry',
    value: 'paraguay',
    flag: '/flags/paraguay.webp',
  },
  Uruguay: {
    label: 'Uruguay',
    shortName: 'ury',
    value: 'uruguay',
    flag: '/flags/uruguay.webp',
  },
  Suriname: {
    label: 'Suriname',
    shortName: 'sur',
    value: 'suriname',
    flag: '/flags/suriname.webp',
  },
  Guyana: {
    label: 'Guyana',
    shortName: 'guy',
    value: 'guyana',
    flag: '/flags/guyana.webp',
  },
  'Islas Malvinas': {
    label: 'Islas Malvinas',
    shortName: 'flk',
    value: 'falkland islands (malvinas)',
    flag: '/flags/falkland_islands_malvinas.webp',
  },
  'Guyana Francesa': {
    label: 'Guyana Francesa',
    shortName: 'guf',
    value: 'french guiana',
    flag: '/flags/french_guiana.webp',
  },
} as const;

export const COUNTRIES_LIST = Object.keys(COUNTRIES);

export const COUNTRIES_VALUE = Object.values(COUNTRIES);

export const SOUTH_AMERICA = Object.values(COUNTRIES).filter(
  country => country.value === 'south america'
)[0];
