import { useState } from 'react';
import { COUNTRIES, COUNTRIES_LIST, SOUTH_AMERICA, type Country } from '../../consts';
import { Autocomplete, type ComboboxItem, type OptionsFilter } from '@mantine/core';
import { AutocompleteOption } from './components';
import { MapPin } from 'lucide-react';

interface CountryAutocompleteProps {
  onSelect: (country: Country) => void;
}

export const CountryAutocomplete = ({ onSelect }: CountryAutocompleteProps) => {
  const [country, setCountry] = useState<string>(SOUTH_AMERICA.label);

  const handleOnSelect = (_country: string) => {
    setCountry(_country);

    const selectedCountry = COUNTRIES[_country];
    if (selectedCountry?.label) {
      onSelect(selectedCountry);

      const countryPath =
        selectedCountry.label === SOUTH_AMERICA.label
          ? '/'
          : `${selectedCountry.value.toLowerCase().replace(/\s+/g, '-')}`;

      window.history.pushState(null, '', countryPath);
    }
  };

  const handleOnBlur = () => {
    if (!country) {
      setCountry(SOUTH_AMERICA.label);
      onSelect(SOUTH_AMERICA);

      return;
    }
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
      value={country}
      leftSection={<MapPin className="text-primary" strokeWidth={1.5} />}
      filter={showAllWhenSelected}
      onChange={handleOnSelect}
      onBlur={handleOnBlur}
      renderOption={AutocompleteOption}
    />
  );
};
