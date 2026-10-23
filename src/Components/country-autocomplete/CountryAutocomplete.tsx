import { COUNTRIES, COUNTRIES_LIST, SOUTH_AMERICA } from '../../consts';
import { Autocomplete, type ComboboxItem, type OptionsFilter } from '@mantine/core';
import { AutocompleteOption } from './components';
import { MapPin } from 'lucide-react';
import { useCovidStore } from '../../stores';
import { getCountryFromPath, getCountryPath } from '../../utils';
import { useEffect, useState } from 'react';

export const CountryAutocomplete = () => {
  const { country, setCountry } = useCovidStore();
  const [search, setSearch] = useState(country.label);

  useEffect(() => {
    const syncCountryFromRoute = () => {
      const countryFromRoute = getCountryFromPath(window.location.pathname) ?? SOUTH_AMERICA;

      if (countryFromRoute.value === SOUTH_AMERICA.value && window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/');
      }

      setCountry(countryFromRoute);
      setSearch(countryFromRoute.label);
    };

    syncCountryFromRoute();
    window.addEventListener('popstate', syncCountryFromRoute);

    return () => window.removeEventListener('popstate', syncCountryFromRoute);
  }, [setCountry]);

  const handleOnSelect = (_country: string) => {
    const selectedCountry = COUNTRIES[_country];
    if (!selectedCountry) return;

    setCountry(selectedCountry);
    setSearch(selectedCountry.label);
    window.history.pushState(null, '', getCountryPath(selectedCountry));
  };

  const handleOnBlur = () => {
    setSearch(country.label);
  };

  const showAllWhenSelected: OptionsFilter = ({ options, search }) => {
    const items = options as ComboboxItem[];
    return items.some(item => item.label === search)
      ? items
      : items.filter(item => item.label.toLowerCase().includes(search.toLowerCase().trim()));
  };

  return (
    <Autocomplete
      placeholder="Buscar país..."
      size="lg"
      className="w-full max-w-xl mx-auto"
      data={COUNTRIES_LIST}
      value={search}
      leftSection={<MapPin className="text-primary" strokeWidth={1.5} />}
      filter={showAllWhenSelected}
      onChange={setSearch}
      onOptionSubmit={handleOnSelect}
      onBlur={handleOnBlur}
      renderOption={AutocompleteOption}
    />
  );
};
