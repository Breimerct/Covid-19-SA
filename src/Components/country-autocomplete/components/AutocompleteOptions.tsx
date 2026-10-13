import { Avatar, Group, Text, type AutocompleteProps } from '@mantine/core';
import { COUNTRIES } from '../../../consts';

export const AutocompleteOption: AutocompleteProps['renderOption'] = ({ option }) => {
  const country = COUNTRIES[option.value as keyof typeof COUNTRIES];

  return (
    <Group gap="sm">
      <Avatar src={country.flag} size={36} radius="xl" />
      <div>
        <Text size="sm">{country?.label}</Text>
        {country?.shortName && (
          <Text size="xs" opacity={0.5}>
            {country.shortName}
          </Text>
        )}
      </div>
    </Group>
  );
};
