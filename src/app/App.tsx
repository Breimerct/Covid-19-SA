import { Grid } from '@mantine/core';
import { CardInfo } from '../Components/card-info';
import { DataCard } from '../Components/data-card';
import { generateCardWithCovidData } from '../consts';
import { CountryAutocomplete } from '../Components/country-autocomplete';
import { useCovidStore } from '../stores';
import { useEffect } from 'react';
import { formatLongDateWithTime } from '../utils';

function App() {
  const { country, covidData, isLoading, fetchCovidData } = useCovidStore();

  useEffect(() => {
    fetchCovidData();
  }, [country]);

  const cards = generateCardWithCovidData(covidData);

  return (
    <main className="w-full min-h-screen max-w-3xl p-4 m-auto ">
      <Grid>
        <Grid.Col span={12}>
          <CountryAutocomplete />
        </Grid.Col>

        <Grid.Col span={12}>
          <CardInfo
            lastUpdate={formatLongDateWithTime(covidData?.updated)}
            totalCases={covidData?.cases || 0}
            increment={covidData?.todayCases || 0}
            flag={country.flag}
            isLoading={isLoading}
          />
        </Grid.Col>

        {cards.map((card, index) => (
          <Grid.Col span={6} key={index}>
            <DataCard
              title={card.title}
              total={card.total}
              increment={card.increment}
              color={card.textColor}
              icon={card.icon}
              isLoading={isLoading}
            />
          </Grid.Col>
        ))}
      </Grid>
    </main>
  );
}

export default App;
