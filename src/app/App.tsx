import { Grid } from '@mantine/core';
import { CardInfo } from '../Components/card-info';
import { DataCard } from '../Components/data-card';
import { DATA_CARDS, SOUTH_AMERICA, type Country } from '../consts';
import { useState } from 'react';
import { CountryAutocomplete } from '../Components/country-autocomplete';

function App() {
  const [country, setCountry] = useState<Country>(SOUTH_AMERICA);

  const handleOnSelect = (_country: Country) => {
    console.log('Country Select Log: ', _country);
    setCountry(_country);
  };

  return (
    <main className="w-full min-h-screen max-w-3xl p-4 m-auto border-amber-300 border-solid border-2">
      <Grid>
        <Grid.Col span={12}>
          <CountryAutocomplete onSelect={handleOnSelect} />
        </Grid.Col>

        <Grid.Col span={12}>
          <CardInfo
            lastUpdate={new Date().toLocaleDateString('es-Es', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            totalCases={4000000}
            increment={0}
            flag={country.flag}
          />
        </Grid.Col>

        {DATA_CARDS.map((card, index) => (
          <Grid.Col span={6} key={index}>
            <DataCard
              title={card.title}
              total={card.total}
              increment={card.increment}
              color={card.textColor}
              icon={card.icon}
            />
          </Grid.Col>
        ))}
      </Grid>
    </main>
  );
}

export default App;
